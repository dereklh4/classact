import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
//TODO: ENSURE ALL SIGNOUTS CAN change the navigation rendering

const Tile = ({name, professor, numenrolled, status}) =>
  <div>
    <span> Name: {name}</span>
    <span> Professor: {professor}</span>
    <span> Number Enrolled: {numenrolled}</span>
    <span> Status: {status}</span>


    <Link to={routes.CHATROOM}>
        <button
            type="button"
            onClick={() => console.log('yo')}
        >
                Enter: {name}
        </button>
    </Link>
</div>
export {Tile}
