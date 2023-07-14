import { EmployeesListItem } from '../employees-list-item';

import './employees-list.css';

export const EmployeesList = ({ 
  employeesData, 
  onDelete,
  onToggleProp 
}) => (
  <ul className='app-list list-group'>
    {employeesData.map(({id, ...itemProps}) => (
      <EmployeesListItem 
        key={id} 
        {...itemProps} 
        onDelete={() => onDelete(id)}
        onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
      />
    ))}
  </ul>
);
