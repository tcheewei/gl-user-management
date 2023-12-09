"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Button, Switch,
  Badge,
  Accordion, AccordionHeader, AccordionBody, AccordionList,
} from '@tremor/react';
import { useState } from "react";
import { Event, Membership } from './interfaces';
import { generateStatusIcon, generateStatusColor, generateMembershipType } from './utils';
import './table.css';
import TransitionModal from './TransitionModal';

function initializeSwitchStates(events: Event[]): boolean[][] {
  return events.map(event => Array(event.payload.memberships.length).fill(false));
}

function determineSelectAllSwitchState(switchStates: boolean[][]): boolean {
  return switchStates.every(userLevelSwitchStates => userLevelSwitchStates.every(childLevelSwitchState => childLevelSwitchState));
}

function determineUserLevelSwitchState(parentIndex: number, switchStates: boolean[][]): boolean {
  return switchStates[parentIndex].every((state) => state);
}

function determineButtonState(switchStates: boolean[][], isModalOpen: boolean): boolean {
  // at least one switch is true in switchStates
  return !switchStates.some(row => row.some(value => value === true)) || isModalOpen;
}

export default function UsersTable({ events }: { events: Event[] }) {
  /* checkbox states */
  const [switchStates, setSwitchStates] = useState(initializeSwitchStates(events));

  const handleAllSwitchChange = (value: boolean) => {
    const newSwitchStates = switchStates.map(nestedSwitchStates => nestedSwitchStates.fill(value));
    setSwitchStates(newSwitchStates);
  }

  const handleUserLevelSwitchChange = (value: boolean, parentIndex: number) => {
    const newSwitchStates = [...switchStates];
    newSwitchStates[parentIndex].fill(value);
    setSwitchStates(newSwitchStates);
  };

  const handleMembershipLevelSwitchChange = (value: boolean, parentIndex: number, childIndex: number) => {
    const newSwitchStates = [...switchStates];
    newSwitchStates[parentIndex][childIndex] = value;
    setSwitchStates(newSwitchStates);
  }
  /* checkbox states */

  /* button click */
  const [isOpen, setIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const closeModal = () => {
    setIsOpen(false)
  };
  const openModal = (action: string) => {
    setIsOpen(true);
    setModalAction(action);
  }
  /* button click */

  return (
    <div>
      <div className="flex mb-4">
        <div className="flex items-center justify-content-start space-x-3">
          <Switch
            id={`switch-event-all`}
            name={`switch-event-all`}
            checked={determineSelectAllSwitchState(switchStates)}
            onChange={(newState) => {
              handleAllSwitchChange(newState)
            }}
          />
          <label htmlFor="switch-event-all" className="text-sm">
            Select All
          </label>
        </div>
        <div className="justify-content-end single-mover-bulk-select-checkbox">
          <Button className="mt-2 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 mr-4" onClick={() => openModal("remove")} disabled={determineButtonState(switchStates, isOpen)}>Remove</Button>
          <Button onClick={() => openModal("retain")} disabled={determineButtonState(switchStates, isOpen)}>Retain</Button>
        </div>
      </div>
      <AccordionList className="mx-auto">
        {
          events.map((event: Event, parentIndex: number) => {
            return (
              <div key={event.event_id} className='flex'>
                <div className="flex-none single-mover-bulk-select-checkbox">
                  <Switch
                    id={`switch-event-${parentIndex}`}
                    name={`switch-event-${parentIndex}`}
                    checked={determineUserLevelSwitchState(parentIndex, switchStates)}
                    onChange={(newState) => {
                      handleUserLevelSwitchChange(newState, parentIndex)
                    }}
                  />
                </div>
                <Accordion key={event.event_id} className='flex-auto'>
                  <AccordionHeader>
                    <div className='flex-none text-left'>
                      <Title>User {event.payload.user_id}</Title>
                      <Text>{event.payload.oe_before} - {event.payload.oe_after}</Text>
                    </div>
                    <div className='flex-auto text-right created-date-text-right-middle'>
                      {event.created}
                    </div>
                  </AccordionHeader>
                  <AccordionBody>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell></TableHeaderCell>
                          <TableHeaderCell>Source ID</TableHeaderCell>
                          <TableHeaderCell>Membership Type</TableHeaderCell>
                          <TableHeaderCell>Membership Level</TableHeaderCell>
                          <TableHeaderCell>Status</TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {event.payload.memberships.map((membership: Membership, childIndex: number) => (
                          <TableRow key={membership.source_id}>
                            <TableCell>
                              {/* <input type="checkbox" /> */}
                              <Switch
                                id={`switch-event-item-${parentIndex}-${childIndex}`}
                                name={`switch-event-item-${parentIndex}-${childIndex}`}
                                checked={switchStates[parentIndex][childIndex]}
                                onChange={(newState) => {
                                  handleMembershipLevelSwitchChange(newState, parentIndex, childIndex)
                                }}
                              />
                            </TableCell>
                            <TableCell>{membership.source_id}</TableCell>
                            <TableCell>
                              <Text>{membership.source_type}</Text>
                            </TableCell>
                            <TableCell>
                              <Text>{generateMembershipType(membership.membership_level)}</Text>
                            </TableCell>
                            <TableCell>
                              <Badge icon={generateStatusIcon(membership.status)} color={generateStatusColor(membership.status)}>
                                {membership.status}
                              </Badge>
                            </TableCell>
                            {/* <TableCell>
                            <Text><Button>Retain</Button><Button>Remove</Button></Text>
                          </TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionBody>
                </Accordion>
              </div>
            )
          })
        }
      </AccordionList>
      <TransitionModal isOpen={isOpen} action={modalAction} closeModal={closeModal} events={events} switchStates={switchStates} />   
    </div>
  );
}
