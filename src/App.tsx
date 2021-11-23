import { Fragment, useEffect, useState } from 'react';
import useRowPicker from './RowPicker';
import PopOver from './RowPicker/PopOver';

// Fake data
import { listItems, allColumns } from './data';
import useMediaQueries from './utils/useMediaQueries';
import Spacer from './components/Spacer';
import Icon from './RowPicker/Icon';
import Button from './components/Button';
import { Pagination, paginateArray } from './components/Pagination';
import './App.css';
import './RowPicker/RowPickerGold.css';
import './RowPicker/RowPickerPink.css';
// import './RowPicker/RowPickerDark.css';

const App = () => {
    const [toolbarActive, setToolBarActive] = useState(false);
    const [noBorder, setBorder] = useState(false);
    // PAGINATION
    const [paginationActive, setPaginationActive] = useState(false);
    const [paginatedClient, setPaginatedClient] = useState<{ data: any; pager: any }>({
        data: [],
        pager: {},
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        if (paginationActive) {
            setPaginatedClient(paginateArray(listItems, currentPage, itemsPerPage));
        }
    }, [currentPage, itemsPerPage, paginationActive]);

    const {
        /** Mark up */
        component,
        /** Call backs */
        resultsNewCell,
        // results,
        // resultsFilters,
        // resultsSorters,
        // resultsSelectedRows,
    } = useRowPicker({
        columns: allColumns,
        //out of range
        expandableColumn: 2,
        // rows: listItems,
        rows: paginationActive ? paginatedClient?.data : listItems,
        sorters: {
            property: 'feeling',
            isDescending: true,
        },
        /** Accesibility */
        id: 'row-picker-raw',
        label: 'row-picker-title-raw',
        description: 'row-picker-description-raw',
        toolbar: toolbarActive ? undefined : <span />,
        /** Styles and async work */
        loading: false,
        classes: {
            root: noBorder ? 'wrap' : '',
            popoverAction: 'button-popover',
            popoverActionSelected: 'button-popover-selected',
        },
    });

    useEffect(() => {
        if (resultsNewCell === null) return;
        console.log('NEW CELL CONTENT', resultsNewCell);
    }, [resultsNewCell]);

    const setColor = (color: string) => {
        const element = document.querySelector('html');

        if (element !== null) {
            element.setAttribute('class', '');
            element?.classList.add(color);
        }
    };
    const resetColor = () => {
        const element = document.querySelector('html');

        if (element !== null) {
            element.setAttribute('class', '');
        }
    };
    return (
        <main>
            <Spacer />
            <div className="header">
                <PopOver
                    label="TRY"
                    // icon={<Icon variant="chevron"/>}
                    icon="chevron"
                    classes={{
                        popoverButton: 'demo-pop-button',
                        popoverContent: 'demo-pop-content',
                        popoverRoot: 'demo-pop-root',
                    }}
                >
                    <Button
                        variant="filled"
                        className={paginationActive ? 'header-on' : ''}
                        onTap={() => {
                            if (!paginationActive) {
                                setToolBarActive(false);
                            }
                            setPaginationActive((prev) => !prev);
                        }}
                    >
                        Client side pagination
                    </Button>
                    <Button
                        variant="filled"
                        className={toolbarActive ? 'header-on' : ''}
                        onTap={() => {
                            if (paginationActive) {
                                setPaginationActive(false);
                            }
                            setToolBarActive((prev) => !prev);
                        }}
                    >
                        Toolbar
                    </Button>
                    <Button variant="filled" className={noBorder ? 'header-on' : ''} onTap={() => setBorder((prev) => !prev)}>
                        Border
                    </Button>
                    {/* <span aria-hidden="true" className="hr" /> */}

                    <Button variant="filled" onTap={() => setColor('gold-theme')}>
                        Gold
                    </Button>
                    <Button variant="filled" onTap={() => setColor('pink-theme')}>
                        Pink
                    </Button>
                    <Button variant="filled" onTap={() => resetColor()}>
                        Default
                    </Button>
                </PopOver>
            </div>

            <Spacer />

            <h1 id="row-picker-title-raw">List of influencers.</h1>
            <h2 id="row-picker-description-raw"> Pick your favourites. </h2>

            <Spacer />
            {paginationActive ? (
                <div className="pagination">
                    <p>
                        Page {currentPage} of {paginatedClient.pager.totalPages}. Showing entries {itemsPerPage} of {paginatedClient.pager.totalItems}.
                    </p>
                    <br />
                    <Pagination current={currentPage} count={paginatedClient.pager.totalPages} handleChange={(event, page) => setCurrentPage(page)} />
                </div>
            ) : null}
            <Spacer />
            <aside>{component}</aside>
            <Spacer />
        </main>
    );
};

export default App;
