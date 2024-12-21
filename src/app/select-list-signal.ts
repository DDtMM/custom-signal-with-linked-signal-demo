import { computed, linkedSignal, Signal, untracked, WritableSignal } from '@angular/core';

export interface SelectListItem<T> {
  /** The selections state of the item. */
  selected: boolean;
  /** The value of the item in the list. */
  value: T;
}

export type SelectListSignal<T> = Signal<SelectListItem<T>[]> & {
  /** The currently selected items as a writable signal. */
  $selections: WritableSignal<T[]>;
  /** Explicity set the selection state of an item or items */
  set: (item: T, selected: boolean) => void;
  /** Explicity set the select state of all items.  Useful for clearing selections or selecting all items. */
  setAll: (selected: boolean) => void;
  /** Invert the selection state of an item or set of items. */
  toggle: (item: T) => void;
};

export function selectListSignal<T>(dataSource: () => T[]): SelectListSignal<T> {
  const $selections = linkedSignal<T[], T[]>({
    source: dataSource,
    computation: (source, previous) => {
      const selectedItems = previous?.value ?? [];
      return source.filter((item) => selectedItems.includes(item));
    }
  });
  const $output = computed(() => {
    const selectedItems = $selections();
    return dataSource().map((value) => ({ selected: selectedItems.includes(value), value }));
  }) as SelectListSignal<T>;
  $output.$selections = $selections;
  $output.set = (item, selected) => {
    if (selected) {
      $selections.update((prior) => untracked(dataSource).filter((x) => prior.includes(x) || item === x));
    } else {
      $selections.update((prior) => prior.filter((x) => item === x));
    }
  };
  $output.setAll = (selected) => $selections.set(selected ? untracked(dataSource) : []);
  $output.toggle = (item) => $selections.update((prior) => prior.includes(item) ? prior.filter((x) => item !== x) : [...prior, item]);
  return $output;
}


// export function selectListSignalAdvanced<T>(itemsSource: () => T[]): SelectListSignal<T> {
//   const $selections = linkedSignal<T[], T[]>({
//     source: itemsSource,
//     computation: (source, previous) => {
//       const selectedItems = previous?.value ?? [];
//       return source.filter((item) => selectedItems.includes(item));
//     }
//   });
//   const $output = computed(() => {
//     const selectedItems = $selections();
//     return itemsSource().map((item) => ({ selected: selectedItems.includes(item), value: item }));
//   }) as SelectListSignal<T>;
//   $output.$selections = $selections;
//   $output.set = (itemOrItems, selected) => {
//     const items = normalizeElementOrArray(itemOrItems);
//     if (selected) {
//       $selections.update((prior) => untracked(itemsSource).filter((x) => prior.includes(x) || items.includes(x)));
//     } else {
//       $selections.update((prior) => prior.filter((x) => !items.includes(x)));
//     }
//   };
//   $output.setAll = (selected) => $selections.set(selected ? untracked(itemsSource) : []);
//   $output.toggle = (itemOrItems) => {
//     const items = normalizeElementOrArray(itemOrItems);
//     return $selections.update((prior) => prior.filter((x) => !items.includes(x)).concat(items.filter((x) => !prior.includes(x))));
//   };
//   return $output;

//   function normalizeElementOrArray<T>(itemOrItems: T | T[]): T[] {
//     return Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];
//   }
// }