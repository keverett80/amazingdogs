import React, { useState } from 'react';
import {
  MDBStepper,
  MDBStepperStep,
  MDBStepperHead,
  MDBStepperContent,
  MDBBtn
} from 'mdb-react-ui-kit';

function Upgrade() {

  const [btnStepper, setBtnStepper] = useState(1);
  const [prevBtnStepper, setPrevBtnStepper] = useState(0);

  return (
    <div className='w-100'>
      <div className='mb-3'>
        <MDBBtn
          onClick={() => {
            btnStepper !== 1 && setPrevBtnStepper(btnStepper);
            btnStepper >= 2 && setBtnStepper(btnStepper - 1);
          }}
        >
          prev
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            1 !== btnStepper && setPrevBtnStepper(btnStepper);
            setBtnStepper(1);
          }}
        >
          step1
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            2 !== btnStepper && setPrevBtnStepper(btnStepper);
            setBtnStepper(2);
          }}
        >
          step2
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            3 !== btnStepper && setPrevBtnStepper(btnStepper);
            setBtnStepper(3);
          }}
        >
          step3
        </MDBBtn>
        <MDBBtn
          onClick={() => {
            btnStepper !== 3 && setPrevBtnStepper(btnStepper);
            btnStepper <= 2 && setBtnStepper(btnStepper + 1);
          }}
        >
          next
        </MDBBtn>
      </div>
      <div>
        <MDBStepper
          outerState={btnStepper}
          setOuterState={setBtnStepper}
          prevOuterState={prevBtnStepper}
          setPrevOuterState={setPrevBtnStepper}
        >
          <MDBStepperStep itemId={1}>
            <MDBStepperHead icon='1' text='step1' />
            <MDBStepperContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua
            </MDBStepperContent>
          </MDBStepperStep>
          <MDBStepperStep itemId={2}>
            <MDBStepperHead icon='2' text='step2' />
            <MDBStepperContent>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat
            </MDBStepperContent>
          </MDBStepperStep>
          <MDBStepperStep itemId={3}>
            <MDBStepperHead icon='3' text='step3' />
            <MDBStepperContent>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur
            </MDBStepperContent>
          </MDBStepperStep>
        </MDBStepper>
      </div>
    </div>
  );
}

export default Upgrade;