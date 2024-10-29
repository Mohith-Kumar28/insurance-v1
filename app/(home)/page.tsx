import React from 'react';
import { Navbar } from './_components/navbar';
import { TeamSection } from './_components/sections/team';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HeroSection } from './_components/sections/hero';
import { FooterSection } from './_components/sections/footer';

function HomePage() {
  return (
    <ScrollArea className="h-screen">
      <Navbar />
      <HeroSection />
      <TeamSection />
      <FooterSection />
    </ScrollArea>
  );
}

export default HomePage;
