import { h } from 'preact';

const Solution = ({type,solution}) => {
    return (
        <p>The generated random {type} was: {solution}</p>
        );
  };
  
  export default Solution;