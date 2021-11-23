import { nanoid } from 'nanoid';
import { RowPickerColumns, BaseT } from './RowPicker/types';
import Tag from './components/Tag';
import Sparkline from './components/Spark';
import Avatar from './components/Avatar';
import Donut from './components/Donut';
import Link from './components/Link';
import Icon from './RowPicker/Icon';

export const pickColumns = (cols: Array<string>): RowPickerColumns => {
    let results: RowPickerColumns = [
        {
            id: nanoid(),
            value: 'pick',
            label: '',
            width: '60px',
            align: 'center',
        },
        ...allColumns.splice(0, 3),
    ];

    //  enum WidgetsColumns {
    //     EDITABLE = 'cEditable',
    //     BINARY = 'cBinary',
    //     AVATAR = 'cAvatar',
    //     SPARKLINE = 'cSpark',
    //     EXPANDABLE = 'cExpandable',
    //     SOON = 'cSoon',
    // }
    cols.map((colName) => {
        if (colName === 'cEditable') {
            const el = allColumns.find((col) => col.value === 'comment');
            if (el !== undefined) {
                results.push(el);
            }
        }
        if (colName === 'cAvatar') {
            const el = allColumns.find((col) => col.value === 'avatar');
            if (el !== undefined) {
                results.push(el);
            }
        }
        if (colName === 'cSpark') {
            const el = allColumns.find((col) => col.value === 'trend');
            if (el !== undefined) {
                results.push(el);
            }
        }
        if (colName === 'cExpandable') {
            const el = allColumns.find((col) => col.value === 'name');
            if (el !== undefined) {
                results.push(el);
            }
        }
        if (colName === 'cBinary') {
            const el = allColumns.find((col) => col.value === 'following');
            if (el !== undefined) {
                results.push(el);
            }
        }
    });
    return results;
};

export const allColumns: RowPickerColumns = [
    {
        id: nanoid(),
        value: 'pick',
        label: '',
        width: '60px',
        align: 'center',
    },
    {
        id: nanoid(),
        value: 'avatar',
        label: 'Avatar',
        width: '120px',
        align: 'center',
        formatter: (input: string) => <Avatar url={input} />,
        variant: 'isUnsortable',
    },
    {
        id: nanoid(),
        value: 'instagram',
        label: 'IG',
        width: '200px',
        align: 'flex-start',
        formatter: (input: string) => (
            <Link to={input}>
                <Icon variant="link" title="External link" /> {Array.from(input.replace('https://www.instagr', '...')).slice(0, 23)}
            </Link>
        ),
    },
    {
        id: nanoid(),
        value: 'name',
        label: 'Name',
        width: '140px',
        align: 'flex-start',
    },
    {
        id: nanoid(),
        value: 'comment',
        label: 'Comment',
        width: '290px',
        align: 'center',
        variant: 'isEditable',
    },

    {
        id: nanoid(),
        value: 'tags',
        label: 'Tags',
        width: '300px',
        align: 'flex-end',
        formatter: (input: string) => (
            <div data-tag-cat={input} className={`row-gap fx-hue tag-cell ${input.split(' ').length > 4 ? 'tag-cell-tip' : ''}`}>
                {input.split(' ').length > 4 ? (
                    <Tag>
                        <Icon variant="hash" title="Hashtags" fill="var(--accent-200)" />+ {input.split(' ').length}
                    </Tag>
                ) : (
                    input.split(' ').map((it: string) => (
                        <Tag key={`tag-${it.toLowerCase()}`}>
                            <Icon variant="hash" title="Hashtags" fill="var(--accent-200)" />
                            {it}
                        </Tag>
                    ))
                )}
            </div>
        ),
    },

    {
        id: nanoid(),
        value: 'published',
        label: 'Last',
        width: '100px',
        align: 'flex-end',
        formatter: (input: Date) => new Intl.DateTimeFormat().format(new Date(input)),
    },
    {
        id: nanoid(),
        value: 'trend',
        label: 'Popularity',
        width: '130px',
        align: 'center',
        formatter: (input: Array<{ [key: string]: number }>) => <Sparkline datum={input} />,
    },
    {
        id: nanoid(),
        value: 'following',
        label: 'Following',
        width: '130px',
        align: 'center',
    },
    {
        id: nanoid(),
        value: 'pie',
        label: 'Trend',
        formatter: (input: string) => <Donut value={input} />,
        width: '100px',
        align: 'center',
    },
];

export const listItems: Array<BaseT> = [
    {
        id: nanoid(),
        pie: 76,
        name: 'Influencer',
        author: '🐶🐶',
        published: '2019',
        //
        tags: 'AAA BB',
        following: false,
        comment: 'Content rated as 9',
        avatar: 'https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg',
        instagram: 'https://www.instagram.com/billieeilish',
        category: "WHEN THE PARTY'S OVER",
        trend: [
            {
                year: 2019,
                value: 12,
            },
            {
                year: 2020,
                value: 22,
            },
            {
                year: 2021,
                value: 38,
            },
            {
                year: 2022,
                value: 67,
            },
        ],
    },

    {
        id: nanoid(),
        pie: 56,
        name: 'Influencer',
        author: '🐱🐱',
        published: '2021',
        //
        tags: 'AAA BB CC DD',
        following: true,
        comment: 'Content rated as 8.5',
        avatar: 'https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg',
        instagram: 'https://www.instagram.com/billieeilish',
        category: "WHEN THE PARTY'S OVER",
        children: {
            name: '🐱🐱🐱🐱🐱🐱🐱🐱 🐱🐱🐱🐱 🐱🐱🐱🐱🐱🐱',
            longStory: ['🐱🐱🐱🐱', '🐱🐱🐱🐱🐱🐱🐱🐱', '🐱🐱'],
        },
        trend: [
            {
                year: 2019,
                value: 12,
            },
            {
                year: 2020,
                value: 55,
            },
            {
                year: 2021,
                value: 38,
            },
            {
                year: 2022,
                value: 90,
            },
        ],
    },
    {
        id: nanoid(),
        pie: 46,
        name: 'Influencer',
        author: '🐭🐭',
        published: '2001',
        //
        tags: 'AAA BB C DD ',
        following: false,
        comment: 'Content rated as 7',
        avatar: 'https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg',
        instagram: 'https://www.instagram.com/billieeilish',
        category: "WHEN THE PARTY'S OVER",
        trend: [
            {
                year: 2019,
                value: 2,
            },
            {
                year: 2020,
                value: 7,
            },
            {
                year: 2021,
                value: 22,
            },
            {
                year: 2022,
                value: 40,
            },
        ],
    },
    {
        id: nanoid(),
        pie: 16,
        name: 'Influencer',
        author: '🐹🐹',
        published: '2019',
        //
        tags: 'AAAAAAAAAAAA BBB',
        following: true,
        comment: 'Content rated as 8',
        avatar: 'https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg',
        instagram: 'https://www.instagram.com/billieeilish',
        category: "WHEN THE PARTY'S OVER",

        trend: [
            {
                year: 2019,
                value: 5,
            },
            {
                year: 2020,
                value: 22,
            },
            {
                year: 2021,
                value: 44,
            },
            {
                year: 2022,
                value: 77,
            },
        ],
    },
    {
        id: nanoid(),
        pie: 90,
        name: 'Influencer',
        author: '🐰🐰',
        published: '2018',
        //
        tags: 'AAAaa BBbbb Cccc DDddd EEeeeee',
        following: false,
        comment: 'Content rated as 6',
        avatar: 'https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg',
        instagram: 'https://www.instagram.com/billieeilish',
        category: "WHEN THE PARTY'S OVER",

        trend: [
            {
                year: 2019,
                value: 55,
            },
            {
                year: 2020,
                value: 44,
            },
            {
                year: 2021,
                value: 38,
            },
            {
                year: 2022,
                value: 17,
            },
        ],
    },
    {
        id: nanoid(),
        pie: 16,
        name: 'Influencer',
        author: '🦊🦊',
        published: '2020',
        //
        tags: 'AAAXXX BB C',
        following: false,
        comment: 'Content rated as 10',
        avatar: 'https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg',
        instagram: 'https://www.instagram.com/billieeilish',
        category: "WHEN THE PARTY'S OVER",
        children: {
            name: '🦊🦊🦊🦊 🦊🦊🦊🦊🦊🦊🦊🦊 🦊 🦊🦊🦊 🦊🦊 🦊🦊',
        },
        trend: [
            {
                year: 2019,
                value: 10,
            },
            {
                year: 2020,
                value: 24,
            },
            {
                year: 2021,
                value: 68,
            },
            {
                year: 2022,
                value: 17,
            },
        ],
    },
    {
        id: nanoid(),
        pie: 36,
        name: 'Influencer',
        author: '🐨🐨',
        published: '2018',
        //
        tags: 'AAAXXX BB C',
        following: false,
        comment: 'Content rated as 5',
        avatar: 'https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg',
        instagram: 'https://www.instagram.com/billieeilish',
        category: "WHEN THE PARTY'S OVER",
        trend: [
            {
                year: 2019,
                value: 10,
            },
            {
                year: 2020,
                value: 24,
            },
            {
                year: 2021,
                value: 68,
            },
            {
                year: 2022,
                value: 17,
            },
        ],
    },
    {
        id: nanoid(),
        pie: 76,
        name: 'Influencer',
        author: '🦁',
        published: '2017',
        tags: 'AAAXXX BB C',
        following: false,
        comment: 'Content rated as 5',
        avatar: 'https://pbs.twimg.com/profile_images/1396773723609387008/4OIYafWJ_400x400.jpg',
        instagram: 'https://www.instagram.com/billieeilish',
        category: "WHEN THE PARTY'S OVER",
        trend: [
            {
                year: 2019,
                value: 39,
            },
            {
                year: 2020,
                value: 44,
            },
            {
                year: 2021,
                value: 28,
            },
            {
                year: 2022,
                value: 9,
            },
        ],
    },
];

// export const sm = ([] as RowPickerColumns).concat(baseColumns.slice(0, 2).map((item, pos) => (pos === 1 ? { ...item, width: '280px' } : item)));
// export const md = ([] as RowPickerColumns).concat(baseColumns.slice(0, 3));
// export const lg = [...baseColumns, ...customColumns];

// export const columns = {
//     sm,
//     md,
//     lg,
// };
