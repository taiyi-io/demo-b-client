export default function Pagination(props){
    const {baseURL, current, total } = props;
    const isFirst = 0 === current;
    const isLast = (total - 1) === current;
    var items = [];
    items.push((
        <li className={isFirst? 'page-item disabled': 'page-item'} key='first'>
            <a className="page-link" href={baseURL + '?page=0'} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        ));
    for (let page = 0; page < total; page++){
        items.push(
            <li className={page === current? 'page-item disabled': 'page-item'} key={'page-' + page}><a className="page-link" href={baseURL + '?page=' + page}>{page + 1}</a></li>
        );
    }
    items.push((
        <li className={isLast? 'page-item disabled': 'page-item'} key='last'>
            <a className="page-link" href={baseURL + '?page=' + (total - 1)} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
        ));        

    return (
        <nav aria-label="navigation">
            <ul className="pagination justify-content-center">
                {items}
            </ul>
        </nav>
    )
}