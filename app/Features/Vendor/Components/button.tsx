import Button from '@mui/material/Button';

interface ButtonProps {
  name: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ButtonComponent = (props: any) => {
  return (
    <Button 
      variant="contained" 
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
      fullWidth
    >
      {props.name}
    </Button>
  );
};

export default ButtonComponent;