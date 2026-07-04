import type { Meta, StoryObj } from '@storybook/react';
import { BookingForm } from './BookingForm';

const offices = [
  { value: 'bole', label: 'Addis Ababa — Bole sub-city' },
  { value: 'kirkos', label: 'Addis Ababa — Kirkos sub-city' },
];
const dates = [
  { value: '2019-01-05', label: 'Meskerem 5, 2019 EC' },
  { value: '2019-01-06', label: 'Meskerem 6, 2019 EC' },
];
const slots = [
  { value: '09:00', label: '09:00' },
  { value: '09:30', label: '09:30', disabled: true },
  { value: '10:00', label: '10:00' },
];

const meta: Meta<typeof BookingForm> = {
  title: 'Patterns/AppointmentBooking',
  component: BookingForm,
  args: { offices, dates, slots, onConfirm: async () => {} },
};
export default meta;

type Story = StoryObj<typeof BookingForm>;

export const Default: Story = {};

export const SlotTaken: Story = {
  args: {
    onConfirm: async () => {
      throw new Error('slot taken');
    },
  },
};
