import styles from './Input.module.scss';

function Input({type, placeholder, value, setValue}) {
    return ( 
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e=>setValue(e.target.value)}
        ></input>
     );
}

export default Input;