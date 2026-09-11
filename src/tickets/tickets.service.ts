import { Injectable, NotFoundException } from '@nestjs/common';
import { Ticket } from './ticket.interface';

@Injectable()
export class TicketsService {
  private readonly tickets: Ticket[] = [
    {
      id: 1,
      subject: 'Ticket 1',
      description: 'Description 1',
      priority: 'medium',
      status: 'open',
      createdAt: '2023-01-01',
    },
    {
      id: 2,
      subject: 'Ticket 2',
      description: 'Description 2',
      priority: 'high',
      status: 'open',
      createdAt: '2023-01-02',
    },
    {
      id: 3,
      subject: 'Ticket 3',
      description: 'Description 3',
      priority: 'low',
      status: 'closed',
      createdAt: '2023-01-03',
    },
  ];

  findAll(status?:Ticket['status'],priority?:Ticket['priority']) {
    let tickets = this.tickets;

    if(status){
      tickets = tickets.filter((ticket) => ticket.status === status);
    }
    if(priority){
      tickets = tickets.filter((ticket) => ticket.priority === priority);
    }
    return tickets;
  }

  findOne(id: number) {
    const ticket = this.tickets.find((ticket) => ticket.id === id);

    if (!ticket) {
      throw new NotFoundException(`Ticket ${id} not found`);
    }
    return ticket;
  }
}
