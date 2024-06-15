'use client';

import React, { useState } from "react";

export function useHooks() {
  const [hours, setHours] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [activity, setActivity] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('hours, tag, activity', hours, tag, activity);
    setHours('');
    setTag('');
    setActivity('');
  }

  return {
    hours,
    tag,
    activity,
    setHours,
    setTag,
    setActivity,
    handleSubmit,
  }
}