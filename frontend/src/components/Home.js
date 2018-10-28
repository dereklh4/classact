import React, {Component} from 'react';
import {SignOutButton} from './SignOut'
import {Tile} from './Tile'


class HomePage extends Component {

  render() {
    const dummyData = [
      {name: 'intro to algos', professor: 'dr Algo', enrolled: 10, status: 'Student'},
      {name: 'intro to balgos', professor: 'dr Balgo', enrolled: 100, status: 'Prof'},
      {name: 'intro to Calalgos', professor: 'dr CAlgo', enrolled: 999, status: 'Student'},
    ];
    return (
      <div>
        <h1>Home</h1>
        <h2>Classrooms</h2>
        {dummyData.map(a =>
            <Tile name={a.name} professor={a.professor} numenrolled={a.enrolled} status={a.status}/>

        )
        }

        <SignOutButton/>
      </div>

    )
  }
}

export  default HomePage;
