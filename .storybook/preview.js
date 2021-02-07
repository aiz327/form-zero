
import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming'
import multi from '../src/stories/multi-cascade.stories'
addParameters({
  options: {
    theme: themes.dark
  }
})

//👇 Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
