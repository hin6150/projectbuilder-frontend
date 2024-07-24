import { Meta, StoryObj } from '@storybook/react'
import Text from './Text'

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

// export const Playground: Story = {}

// const Template: Story = (args) => <Text args} />;

export const Heading1: Story = {
  args: {
    className: 'text-h1',
    children: 'This is a heading 1',
  },
}

export const Heading2: Story = {
  args: {
    className: 'text-h2',
    children: 'This is a heading 2',
  },
}

export const Heading3: Story = {
  args: {
    className: 'text-h3',
    children: 'This is a heading 3',
  },
}

export const Heading4: Story = {
  args: {
    className: 'text-h4',
    children: 'This is a heading 4',
  },
}

export const Paragraph: Story = {
  args: {
    className: 'text-p',
    children: 'This is a paragraph',
  },
}

export const Body: Story = {
  args: {
    className: 'text-body',
    children: 'This is body text',
  },
}

export const Subtitle: Story = {
  args: {
    className: 'text-subtle',
    children: 'This is a subtitle',
  },
}

export const Small: Story = {
  args: {
    className: 'text-small',
    children: 'This is small text',
  },
}

export const Blockquote: Story = {
  args: {
    className: 'text-blockquote',
    children: 'This is a blockquote',
  },
}

export const InlineCode: Story = {
  args: {
    className: 'text-inline-code',
    children: 'This is inline code',
  },
}

export const TableHead: Story = {
  args: {
    className: 'text-table-head',
    children: 'Table Head',
  },
}

export const TableItem: Story = {
  args: {
    className: 'text-table-item',
    children: 'Table Item',
  },
}
