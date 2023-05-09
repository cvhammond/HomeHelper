// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Menu {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Menu from './Menu'

export const generated = () => {
  return <Menu />
}

export default {
  title: 'Components/Menu',
  component: Menu,
}
