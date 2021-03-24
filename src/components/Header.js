import PropTypes from 'prop-types'

import Button from './Button'

const Header = ({title, onShow, showAdd}) => {
    const onClick = () => {
        console.log('Clicked')
    }
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button 
            color={showAdd ? 'red' : 'green'} 
            text={showAdd ? 'Cancel' : 'Add'}
            onClick = {onShow}
            />
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