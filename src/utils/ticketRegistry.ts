import type { ComponentType } from 'react';
import { TrainTicket } from '../components/tickets/TrainTicket';
import { TempleTicket } from '../components/tickets/TempleTicket';
import { MuseumTicket } from '../components/tickets/MuseumTicket';
import { Certificate } from '../components/tickets/Certificate';
import { RopewayTicket } from '../components/tickets/RopewayTicket';
import { BoatTicket } from '../components/tickets/BoatTicket';
import { TransitCard } from '../components/tickets/TransitCard';
import { DisneyTicket } from '../components/tickets/DisneyTicket';
import { CRHTicket } from '../components/tickets/CRHTicket';
import { FallbackTicket } from '../components/tickets/FallbackTicket';

export interface TicketComponentProps {
  data: Record<string, string>;
}

const registry: Record<string, ComponentType<TicketComponentProps>> = {
  'train-ticket': TrainTicket,
  'temple-ticket': TempleTicket,
  'museum-ticket': MuseumTicket,
  'certificate': Certificate,
  'ropeway-ticket': RopewayTicket,
  'boat-ticket': BoatTicket,
  'transit-card': TransitCard,
  'disney-ticket': DisneyTicket,
  'crh-ticket': CRHTicket,
};

export function getTicketComponent(
  template: string
): ComponentType<TicketComponentProps> {
  return registry[template] || FallbackTicket;
}
