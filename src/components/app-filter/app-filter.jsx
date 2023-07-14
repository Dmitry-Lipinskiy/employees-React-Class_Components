import classNames from 'classnames';

import { buttonsData } from '../../data/buttons-data';

import './app-filter.css';

export const AppFilter = (props) => (

  <div className='btn-group'>
    {buttonsData.map(({name, label}) => {

      const active = props.filter === name;

      return (
        <button 
          type='button' 
          className={classNames('btn', {'btn-light': active, 'btn-outline-light': !active})}
          key={name}
          onClick={() => props.onFilterSelect(name)}
        >
          {label}
        </button>
      );

    })}
  </div>

);
