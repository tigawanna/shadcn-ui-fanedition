import React from 'react';
import type { StoryDefault, Story } from '@ladle/react';
import { Button } from './button';
import '../../tailwind.css';

export default {
  title: 'Level / Sub level',
} satisfies StoryDefault;
export const ButtonStory: Story = () => (
  <Button variant="default" size="lg" className="bg-violet-600 ">
    Hello
  </Button>
);
