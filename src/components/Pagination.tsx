import styles from './Pagination.module.css';
import Button from './Button';
/**
 * 

      const [pageSize, setPageSize] = React.useState(3);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(datas.slice(firstIndex, pageSize));

  React.useEffect(() => {
    setData(datas.slice(0, pageSize));
  }, [pageSize]);

  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10);
    setPage(value);
    setData(datas.slice(firstIndex + pageSize * (value - 1), pageSize * value));
  };

  //Change width
  const changeWidth = (e) => {
    setPageSize(parseInt(e.target.value, 10));
  };
          
 */

interface Props {
    count: number;
    current: number;
    handleChange: (event: any, page: number) => void;
}

export const Pagination = (props: Props) => {
    const { count, handleChange, current } = props;
    let pages: any = [];
    for (let i = 1; i <= count; i++) {
        pages.push(
            <Button variant="filled" value={i} key={i} onTap={(e) => handleChange(e, i)} className={current === i ? styles.active : ''}>
                {i}
            </Button>
        );
    }
    return <div className={styles.root}>{pages}</div>;
};

export function paginateArray<T>(items: T[], currentPage: number = 1, itemsPerPage: number = 10) {
    const offset = (currentPage - 1) * itemsPerPage;
    const data = items.slice(offset).slice(0, itemsPerPage);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const pager: any = {
        currentPage,
        firstPage: 1,
        lastPage: totalPages,
        nextPage: totalPages > currentPage ? currentPage + 1 : totalPages,
        previousPage: currentPage - 1 > 0 ? currentPage - 1 : 1,
        totalItems: items.length,
        totalPages,
    };

    return {
        data,
        pager,
    };
}
