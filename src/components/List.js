import React, { useEffect, useState } from 'react';

export default function MyComponent() {
    const [items, setItems] = useState([]);
    const [itemON, setitemON] = useState('');

    const handleChange = (event) => {
      event.preventDefault()
      if (event.target.form[0].value !== '') {
        fetch('http://localhost:7777/notes', {
          method: 'POST',
          body: event.target.form[0].value
        });
        setitemON(event.target.form[0].value);
        event.target.form[0].value = ''
      }
    }

    const handleChangeDell = (event) => {
      event.preventDefault()
      let as = `http://localhost:7777/notes/${event.target.id}`
      fetch(as, {
        method: 'DELETE'
      });
      setitemON(Math.random());
    }
    const handleChangeгUpdate = (event) => {
      event.preventDefault()
      setitemON(Math.random());
    }
  
    useEffect(() => {
      fetch("http://localhost:7777/notes")
        .then(res => res.json())
        .then(
          (result) => {
            setItems(result);
          }
        )
    }, [itemON])
  
    return (
    <div>
        <div><button onClick={handleChangeгUpdate}>Обновление</button></div>
        <div style={{width: "100%"}}>
        {items.map(item => (
        <div style={{width: "25%", float: "left", border: "solid black 1px", margin: "10px"}} key={item.id}>
            <div style={{padding: "10px"}}>
              <button onClick={handleChangeDell} id={item.id}>Удалить</button>
              <div>{item.content}</div>
            </div> 
        </div>
        ))}
        </div>
        <div style={{width: "100%", float: "left"}}>
          <form onClick={handleChange}>
            <textarea cols="60" rows="5" style={{float: "left"}}></textarea>
            <input style={{float: "left", marginTop: "60px"}} type="submit" value="Отправить" />
          </form>
        </div>
    </div>
    );
  }