import Button from '@mui/material/Button';

const ButtonComponent= (props: any) => {
    console.log("Login page loaded");
  return (
    <div>
        {/* <button onClick={props.onClick}>{props.name}</button> */}
        <Button variant="contained" onClick={props.onClick}>{props.name}</Button>
    </div>
  )
}

export default ButtonComponent;