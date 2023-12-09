"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  Title, Button,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from "@tremor/react";
import { Event, Membership } from './interfaces';
import Nav from './nav';

interface FlattenedEvent {
  event_id: string;
  user_id: number;
  source_id: number;
  source_type: string;
  membership_level: number;
  status: string;
}

export default function TransitionModal({ isOpen, action, closeModal, events, switchStates }: { isOpen: boolean, action: string, closeModal: () => void, events: Event[], switchStates: boolean[][] }) {

  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const callApiBeforeClosingModal = async (performAction: string) => {

    setProcessing(true)
    setDisabled(true)

    if (performAction === "yes") {
      await new Promise((resolve) => {
        console.log("processing...")
        setTimeout(resolve, 2000)
      });
    }

    closeModal();
    // put 500ms delay to avoid the button from being clicked when the modal is closing
    await new Promise((resolve) => {
      setTimeout(resolve, 500)
    });
    setDisabled(false);
    setProcessing(false);
    
  }

  let filteredEvents: Event[] = { ...events }

  filteredEvents = events.filter((event: Event, index: number) => {
    return switchStates[index].some((state) => state === true);
  });

  let filteredSwitchStates = switchStates.filter((switchState: boolean[], index: number) => {
    return switchState.some((state) => state === true);
  });

  let flattenedEvents: FlattenedEvent[] = [];

  filteredEvents.map((event: Event, eventIndex: number) => (
      event.payload.memberships.map((membership: Membership, membershipIndex: number) => {
        // console.log(JSON.stringify(membership) + " " + membershipIndex + " " + filteredSwitchStates[eventIndex][membershipIndex])
        if (filteredSwitchStates[eventIndex][membershipIndex]) {
          flattenedEvents.push({
            event_id: event.event_id,
            user_id: event.payload.user_id,
            source_id: membership.source_id,
            source_type: membership.source_type,
            membership_level: membership.membership_level,
            status: membership.status
          })
        }
      })
  ));

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-xl transform overflow-hidden ring-tremor bg-white
                              p-6 text-left align-middle shadow-tremor transition-all rounded-xl"
              >
                <Title>You wish to <b>{action}</b> the selected memberships</Title>
                <Text>Please click Proceed to continue</Text>

                <div className="relative mt-3">
                  <Table className="h-[450px]">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell className="bg-white">event_id</TableHeaderCell>
                        <TableHeaderCell className="bg-white">User</TableHeaderCell>
                        <TableHeaderCell className="bg-white">Membership</TableHeaderCell>
                        <TableHeaderCell className="bg-white">Type</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {flattenedEvents.map((event: FlattenedEvent) => (
                        <TableRow key={event.event_id + event.source_id + event.source_type}>
                          <TableCell>{event.event_id}</TableCell>
                          <TableCell>{event.user_id}</TableCell>
                          <TableCell>{event.source_id}</TableCell>
                          <TableCell>{event.source_type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Button
                  className="mt-2 w-full"
                  loading={processing}
                  disabled={disabled}
                  onClick={() => callApiBeforeClosingModal("yes")}
                >
                  Proceed
                </Button>

                <Button
                  className="mt-2 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                  disabled={disabled}
                  onClick={() => callApiBeforeClosingModal("no")}
                >
                  Go back
                </Button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}