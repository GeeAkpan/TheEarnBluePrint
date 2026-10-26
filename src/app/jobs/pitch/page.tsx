import { Suspense } from 'react';
import PitchBuilder from './PitchBuilder';

export default function PitchBuilderPage() {
  return (
    <Suspense>
      <PitchBuilder />
    </Suspense>
  );
}
