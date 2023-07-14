import { Component } from 'react';

import { AppFilter } from '../app-filter';
import { AppInfo } from '../app-info';
import { EmployeesAddForm } from '../employees-add-form';
import { EmployeesList } from '../employees-list';
import { SearchPanel } from '../search-panel';

import { employeesData } from '../../data/employees-data';

import './app.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: employeesData,
      allEmployees: employeesData.length,
      bonus: employeesData.filter((item) => item.increase).length,
      search: '',
      filter: 'all'
    };
    this.maxId = employeesData.length + 1;
  }

  employees = () => {
    this.setState((state) => ({
      allEmployees: state.data.length,
      bonus: state.data.filter((item) => item.increase).length
    }));
  }

  deleteItem = (id) => {
    this.setState(({data}) => ({
      data: data.filter((item) => item.id !== id)
    }));
    this.employees();
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      id: this.maxId++
    };
    this.setState(({data}) => ({
      data: [...data, newItem]
    }));
    this.employees();
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]};
        }
        return item;
      })
    }));
    this.employees();
  }

  searchEmployees = (data, search) => {
    if (search.length === 0) {
      return data;
    }
    return data.filter((item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
  }

  onUpdateSearch = (search) => {
    this.setState({search});
  }

  employeesFilter = (data, filter) => {
    switch (filter) {
      case 'rise':
        return data.filter((item) => item.rise);
      case 'moreThen1000':
        return data.filter((item) => item.salary > 1000);
      default:
        return data;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  render = () => {

    const {data, bonus, allEmployees, search, filter} = this.state;

    const visibleData = this.employeesFilter(this.searchEmployees(data, search), filter);

    return (
      <div className='app'>
        <AppInfo
          allEmployees={allEmployees}
          bonus={bonus}
        />

        <div className='search-panel'>
          <SearchPanel
            onUpdateSearch={this.onUpdateSearch} 
          />
          <AppFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect} 
          />
        </div>

        <EmployeesList
          employeesData={visibleData} 
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm
          addItem={this.addItem}
        />
      </div>
    );
  }
};
