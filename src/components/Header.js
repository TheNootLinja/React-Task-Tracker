import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Button from './Button';

const Header = ({title, onShow, showAdd}) => {
    const location = useLocation();
    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button 
            color={showAdd ? 'red' : 'green'} 
            text={showAdd ? 'Cancel' : 'Add'}
            onClick = {onShow}
            />}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header