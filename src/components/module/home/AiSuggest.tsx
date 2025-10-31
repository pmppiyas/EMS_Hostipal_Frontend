"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function AiSuggest() {
  const [symptom, setSymptom] = useState("");

  const handleSuggest = () => {
    console.log("User symptom:", symptom);
  };

  return (
    <div className="flex-1 max-w-md w-full">
      <Card className="shadow-lg border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">🤖 AI Doctor Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Describe your symptom (e.g. headache, fever)"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            className="bg-background text-foreground"
          />
        </CardContent>
        <CardFooter className='flex flex-col'>
          <Button onClick={handleSuggest} className="w-full">
            Suggest Treatment
          </Button>
          <p className='text-muted-foreground pt-2'>✅Powered by advance ai model for matching doctor.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
