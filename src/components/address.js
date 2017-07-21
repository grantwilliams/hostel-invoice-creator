import React from 'react';

const Address = ({ firstName, lastName }) => {
  return (
    <div className="row address">
      <div className="col-8">
        <h4>{firstName} {lastName}</h4>
        <form>
          <fieldset className="form-control-sm col-6">
            <input className="form-control" placeholder="Street / No." />
          </fieldset>
          <fieldset className="form-control-sm col-6">
            <input className="form-control" placeholder="Post Code / City" />
          </fieldset>
          <fieldset className="form-control-sm col-4">
            <input className="form-control" placeholder="Country" />
          </fieldset>
        </form>
      </div>
      <div className="col-4 text-right">
        <h5>Bank Account</h5>
        <p>Deutsche Bank<br/>
        BLZ: 100 700 24<br/>
        Account#: 1444835<br/>
        IBAN: DE47 1007 0024 0144 4835 00<br/>
        Tax#: 18/451/51469</p>
      </div>
    </div>
  );
};

export default Address;