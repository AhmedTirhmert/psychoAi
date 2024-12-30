export default defineAppConfig({
  name: 'PsychoAI',
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'slate',
    },
    card: {
      slots: {
        // root: 'bg-[var(--ui-error)] ring ring-[var(--ui-border)] divide-y divide-[var(--ui-border)] rounded-[calc(var(--ui-radius)*2)] shadow-sm',
        // header: 'p-4 sm:px-6',
        body: 'lg:px-5 lg:py-4 sm:p-6',
        // footer: 'p-4 sm:px-6',
      },
    },
    checkbox: { slots: { base: 'cursor-pointer', label: 'cursor-pointer' } },
    button: {
      // variants: {
      //   variant: {
      //     link: 'hover:cursor-pointer',
      //   },
      // },
      slots: {
        base: [
          'inline-flex items-center focus:outline-hidden disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors cursor-pointer',
        ],
      },
    },
    dropdownMenu: {
      item: {
        active: {
          true: {
            item: 'hover:cursor-pointer text-[var(--ui-text-highlighted)] before:bg-[var(--ui-bg-elevated)]',
            itemLeadingIcon: 'text-[var(--ui-text)]',
          },
          false: {
            item: [
              'text-[var(--ui-text)] data-highlighted:text-[var(--ui-text-highlighted)] data-[state=open]:text-[var(--ui-text-highlighted)] data-highlighted:before:bg-[var(--ui-bg-elevated)]/50 data-[state=open]:before:bg-[var(--ui-bg-elevated)]/50',
              'transition-colors before:transition-colors',
            ],
            itemLeadingIcon: [
              'text-[var(--ui-text-dimmed)] group-data-highlighted:text-[var(--ui-text)] group-data-[state=open]:text-[var(--ui-text)]',
              'transition-colors',
            ],
          },
        },
      },
    },
  },
});
