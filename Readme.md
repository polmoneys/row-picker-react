# RowPicker

A **RowPicker** for React with minimalistic surface. Sort of the core of a DataGrid or Table that you can ammend, strip and replace the parts you feel should be different. 

## How to 

Feed **useRowPicker** hook with the datum you wish to display and render the component it returns. Instant Profit. 

```js

import useRowPicker from 'row-picker-react';

function Page(props:Props) {

    const {
        /** Component to render */
        component,
    } = useRowPicker({
        id: 'row-picker',
        label: 'row-picker-title',
        description: 'row-picker-description',
        columns: cols,
        rows: items,
         /** Provide an unreachable number if no expandable cell */
        expandableColumn: 100,
    });

return(
    <section>
        <h1 id="row-picker-title">Datum title. </h1>
        <p id="row-picker-description"> Datum description.</p>
        {component}
    </section>
)
}

```

Available as npm module.

```bash
npm i row-picker-react
```

## State

Display current state of RowPicker to the user in any flavour you'd like. 

```js

import useRowPicker from 'row-picker-react';

function Page(props:Props) {

    const {
      component,
        /** If cell value is boolean can be filtered */
        resultsFilters,
        /** Current sort state */
        resultsSorters,
        /** Some cells can change it's own value, callback. Returns T | null */
        resultsNewCell,
        /** Goal **/
        resultsSelectedRows,
    } = useRowPicker({
        // omitted for brevity
    });
}
```

## Props

Minimalist surface `!==` small surface. Priorities are accessibilty `>` perf `>` dx 



| Name             | TS |   Required |
| :------------ | :---------: | ----------: |
| id        |    string    | ✅ |
| label     |    string     |    ✅ |
| description |    string         |    ✅ |
| columns     |    RowPickerColumns     |    ✅ |
| rows     |    `Array<T>`     |    ✅ |
| expandableColumn     |    number     |    ✅ |
| filters     |    FilterState     |     |
| sorters     |    SortState     |     |
| loading     |    boolean     |     |
| toolbar     |    boolean     |     |
| classes     |    [key in keyof typeof AvailableClassNames]?: string; |    |


`sorters`, `filters`, allow to set an initial value to start the RowPicker in a specific state.


```typescript

type FilterState = Array<{ property: string; isTruthyPicked: boolean }>;

type SortState = {
    property: string;
    isDescending: boolean;
};

```

`onCellChange` prop is the callback after a cell has been edited inline. 

`classes` prop opens styling to some specific elements:

```typescript

export enum AvailableClassNames {
    root = 'rp-root',
    loading = 'rp-loading',
    popoverRoot = 'rp-popover-root',
    popoverButton = 'rp-popover-button',
    popoverContent = 'rp-popover-content',
    popoverAction = 'rp-popover-action',
    popoverActionSelected = 'rp-popover-action-selected',
    popoverRootExpandable = 'rp-popover-root-expandable',
    popoverButtonExpandable = 'rp-popover-button-expandable',
    popoverContentExpandable = 'rp-popover-content-expandable',
}


```

## Columns 

```typescript {1,4-6,11}

interface RowPickerColumn {
    id: string;
    label: string | HTMLSpanElement;
    /** Cell content */
    value: string;
    formatter?: (input: any, extra?: any) => string | ReactNode;
    /** Cell styles */
    width: string;
    align: string; // 'flex-start' | 'center' | 'flex-end';
    /** Is cell editable ? */
    variant?: 'default' | 'isEditable' | 'isUnsortable';
    /** Cell interactivity */
    disabled?: boolean;
    onTap?: (event?: MouseEvent | MouseEventHandler<HTMLSpanElement>) => void;
}
interface RowPickerColumns extends Array<RowPickerColumn> {}

```

Prop `formatter` is what you are looking for if you need to apply some transformation and special rendering on a cell. While it is defined in columns, it actually affects rows.  

``` typescript 
formatter: (input) => (
      <Link to={`https://instagram.com/${input}`}>
          <Icon variant="link" title="External link" /> {Array.from(input).slice(0, 12)}
      </Link>
  )

formatter: (input, rando: boolean) => <Avatar url={input} className={rando ? undefined : 'fx-gray'} />,

formatter: (input: Date) => formatDate(input),


```

## Rows

A generic `T` that should contain `{id:string}`. Any boolean value will be `toString()-ed`. Any Date by default will be `.toDateString()-ed`.

## Toolbar 

You can take **state** and display it to the user without limitations of any kind.


```typescript

<Tag>
    {resultsSorters?.isDescending ? 'Descending' : 'Ascending'}
</Tag>
<Tag>{typeof resultsSorters?.property === 'string' && resultsSorters?.property}</Tag>

{has(resultsFilters) && (
    <Fragment>
        <Tag fill="var(--error-000)" color="var(--error-200)" className="fx-hue">
            FILTERING
        </Tag>
    </Fragment>
)}
{resultsFilters.map((selectedFilter, idx) => (
    <Tag key={idx}>{selectedFilter.property}</Tag>
))}

{has(resultsSelectedRows) && (
    <div className="row-gap">
        <Tag onTap={() => updateSelection(1)}>
            OPERATE ON SELECTION
        </Tag>
        {resultsSelectedRows.length < 3 ? (
            resultsSelectedRows.map((selectedRow) => (
                <Tag key={selectedRow.id.toString()}>
                    ID {selectedRow.id}
                </Tag>
            ))
        ) : (
            <Tag>+{resultsSelectedRows.length}</Tag>
        )}
    </div>
)}

```

## Customizations

Instead of using it as a library copy paste files on your project and:

You should look at `theme.css` as it contains mostly CSS custom properties you can customize. 

Some hooks might already be on your project so feel free to trim them out of existence and use your own. 

Swap on `Icon.tsx` the desired SVG to render instead of current and you are golden. 


