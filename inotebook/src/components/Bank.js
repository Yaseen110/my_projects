import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
function Bank() {
  const dispatch = useDispatch()
  const {depositmoney,withdrawmoney}=bindActionCreators(actionCreators,dispatch)
  return (
    <>
    <div className="container">
    <h2 className="my-3">Welcome to my bank</h2>
    <button type="button" class="btn btn-primary mx-2" onClick={()=>{dispatch(actionCreators.depositmoney(100))}}>+</button>
    deposit/withdrawmoney
    <button type="button" class="btn btn-primary mx-2" onClick={()=>{dispatch(actionCreators.withdrawmoney(100))}}>-</button>
    <br/>
    <button type="button" class="btn btn-primary mx-2" onClick={()=>{depositmoney(100)}}>+</button>
    deposit/withdrawmoney
    <button type="button" class="btn btn-primary mx-2" onClick={()=>{withdrawmoney(100)}}>-</button>
    </div>
    </>
  )
}

export default Bank