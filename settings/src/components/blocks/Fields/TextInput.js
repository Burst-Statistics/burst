const TextInput = ( props ) => {
  console.log( 'TextInput', props );
  const { id, label, value, onChangeHandler } = props;

  console.log( 'TextInput', id, label, value, onChangeHandler );

  function handleChange( e ) {
    onChangeHandler( e.target.value );
  }
  return (
    <div className="burst-field">
      <p className="burst-label">{label}</p>
      <input
        type="text"
        name={id}
        id={id}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
export default TextInput;
