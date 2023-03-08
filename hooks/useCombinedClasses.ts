export const useCombinedClasses = (...classes: (string | false | undefined | null)[]) => classes.filter(Boolean).join(' ');
