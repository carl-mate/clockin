'use client';

import React, { useState } from "react";

type CheckIn = {
  hours: number
  tag: string
  activity: string
}

export function useHooks() {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const parsedData = parseCheckInInput(input);

    if (!parsedData) {
      setError('Invalid check-in format');
      return;
    }

    try {
      // await axios.post('/api/checkins/', parsedData);
      console.log(parsedData);
      setInput('');
      setError(null);
      alert('Check-in submitted successfully');
    } catch (error) {
      console.error('Error submitting check-in:', error);
      alert('Failed to submit check-in');
    }
  };

  const parseCheckInInput = (input: string): CheckIn | null => {
    const match = input.match(/^(\d+(\.\d+)?)\s*(hr|hrs)\s*#(\S+)\s*(.+)$/i);

    if (!match) {
      return null;
    }

    const hours = parseFloat(match[1]);
    const tag = match[4];
    const activity = match[5];

    return { hours, tag, activity };
  };

  return {
    input, setInput, error, handleSubmit
  }
}
