import '@testing-library/jest-dom/vitest';
// Type augmentation for the axe matcher (augments the global `Vi` namespace).
import 'vitest-axe/extend-expect';
import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

// Register the axe accessibility matcher (toHaveNoViolations) at runtime.
expect.extend(matchers);
