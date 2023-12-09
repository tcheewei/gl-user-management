"use client";

// import { sql } from '@vercel/postgres';
import {
  Card, Title, Text, Button, Table, TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import { promises as fs } from 'fs';
import { add, capitalize, eventsData } from './utils';
import DismissButton from './dismiss-button';
import { Dialog, Transition } from "@headlessui/react";
import { JsonData, Event, Membership } from './interfaces';
import Link from 'next/link';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';

  // const [users, setUsers] = useState<User[]>([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch('http://localhost:3000');
  //         const data = await response.json();
  //         setUsers(data);
  //       } catch (error) {
  //         console.error('Error fetching users:', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  // console.log(search)

  // const result = await sql`
  //   SELECT id, name, username, email 
  //   FROM users 
  //   WHERE name ILIKE ${'%' + search + '%'};
  // `;
  // const users = result.rows as User[];

  // Filter events where only user_id is 123 and 456
  // const userIdWithEventsINeedToCertify = [123, 456];
  const userIdWithEventsINeedToCertify = [123, 456, 789, 101112, 131415];
  // const userIdWithEventsINeedToCertify = [123];

  const data = JSON.parse(eventsData);

  const filteredEvents: Event[] = (data.events || []).filter((event: Event) => {
    return userIdWithEventsINeedToCertify.includes(event.payload.user_id);
  });

  const events = filteredEvents as Event[];

  return (
    <div>
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Text className='mb-8'>
          <Link href='https://gitlab-dashboard.csintra.net/home'>Home</Link> / <Link href='/mover'>Mover Management</Link>
        </Text>
        {/* <Search /> */}
        <Card className="mt-6">
          <Title>Certify Mover Access</Title>
          <Text className='mb-6'>Please certify the users' access to GitLab groups/projects within the deadline.</Text>
          <UsersTable events={events} />
        </Card>
      </main>
    </div>

  );
}
