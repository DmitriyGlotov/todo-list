let allTask = JSON.parse(localStorage.getItem('tasks')) || [];
let valueInput = '';
let input = null;
let flagDell = true;

window.onload = function init () {
  input = document.getElementById('add-task');
  input.addEventListener('change', updateValue);
  render();
}

onClickButton = () => {
  valueInput = valueInput.trim();
  if (valueInput) {
    allTask.push({
      text: valueInput,
      isCheck: false,
      flag: false,
    });
    localStorage.setItem('tasks', JSON.stringify(allTask));
    valueInput = '';
    input.value = '';
    render();
  } else {
    valueInput = '';
    input.value = '';
    alert ('WTF???');
  }
}

document.getElementById('add-task').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    valueInput = e.target.value.trim();
    if (valueInput) {
      allTask.push({
        text: valueInput,
        isCheck: false,
        flag: false,
      });
      localStorage.setItem('tasks', JSON.stringify(allTask));
      valueInput = '';
      input.value = '';
      render();
    } else {
      valueInput = '';
      input.value = '';
      alert ('WTF???');
    }
  }
});

updateValue = (event) => {
  valueInput = event.target.value;
}

render = () => {
  const content = document.getElementById('content-page');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allTask.sort((a, b) => a.isCheck - b.isCheck);

  allTask.forEach((item, index) => {
    const container =  document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'task';

    if (flagDell) {
      containButMain = document.getElementById('dell-all');
      createButtonDelAll (containButMain);
    }

    createCheckbox (container, index);

    if (!allTask[index].flag) {
      const text = document.createElement('p');
      text.innerText = item.text;
      text.className = item.isCheck ?  'done-task' : 'text-task';
      container.appendChild(text);

      const containBut = document.createElement('div');
      containBut.className = "contain-but";

      createButtonPen(containBut, index);

      createButtonDel(containBut, index);

      container.appendChild(containBut);
    } else {

      const containBut = document.createElement('div');
      containBut.className = "contain-but";

      const input = document.createElement('input');
      input.className = "input-fixed";
      input.value = allTask[index].text
      container.appendChild(input);

      createButtonDone(containBut, input, index);

      createButtonCancel(containBut, index);

      container.appendChild(containBut);
    }
    content.appendChild(container);
  })
}

createButtonDelAll = (containButMain) => {
  const butDelAll = document.createElement('input');
  butDelAll.type = 'image';
  butDelAll.className = 'but';
  butDelAll.src = 'delall.png';
  containButMain.appendChild(butDelAll);
  flagDell = false;

  butDelAll.onclick = () => {
    allTask.splice(0, allTask.length);
    localStorage.clear();
    render();
  }
}

createCheckbox = (container, index) => {
  const checkBox = document.createElement('input');
  checkBox.type = 'image';
  checkBox.className = 'but';
  if (allTask[index].isCheck) {
    checkBox.src = "checkBoxDone.png";
  } else {
    checkBox.src = "checkBox.png";
  }

  checkBox.onclick = () => {
      allTask[index].isCheck = !allTask[index].isCheck;
      localStorage.setItem('tasks', JSON.stringify(allTask));
      render();
  }
  container.appendChild(checkBox);
}

createButtonPen = (containBut, index) => {
  if (!allTask[index].isCheck) {
    const buttonPen = document.createElement('input');
    buttonPen.type = 'image';
    buttonPen.src = 'pencil.png';
    buttonPen.className = 'but';
    containBut.appendChild(buttonPen);

    buttonPen.onclick = () => {
      onClickButtonPen(index);
    }
  }
}

createButtonDel = (containBut, index) => {
  const buttonDel = document.createElement('input');
  buttonDel.type = 'image';
  buttonDel.src = 'Del.png';
  buttonDel.className = 'but';
  containBut.appendChild(buttonDel);

  buttonDel.onclick = () => {
    onClickButtonDel(index);
  };
}

createButtonCancel = (containBut, index) => {
  const butCanc = document.createElement('input');
  butCanc.className = 'but';
  butCanc.type = 'image';
  butCanc.src = 'cancel.png';
  containBut.appendChild(butCanc);

  butCanc.onclick = () => {
    allTask[index].flag = false;
    localStorage.setItem('tasks', JSON.stringify(allTask));
    render();
  }
}

createButtonDone = (containBut, input, index) => {
  const butDone = document.createElement('input');
  butDone.className = 'but';
  butDone.type = 'image';
  butDone.src = "check.png";
  containBut.appendChild(butDone);

  butDone.onclick = () => {
    allTask[index].flag = false;
    input.value = input.value.trim();
    if (input.value) allTask[index].text = input.value;
    localStorage.setItem('tasks', JSON.stringify(allTask));
    render();
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      allTask[index].flag = false;
      input.value = input.value.trim();
      if (input.value) allTask[index].text = input.value;
      localStorage.setItem('tasks', JSON.stringify(allTask));
      render();
    };
  })
}



onChangeCheckBox = index => {
  allTask[index].isCheck = !allTask[index].isCheck;
  localStorage.setItem('tasks', JSON.stringify(allTask));
  render();
}

onClickButtonDel = (index) => {
  allTask.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(allTask));
  render();
}

onClickButtonPen = (index) => {
  allTask[index].flag = true;
  localStorage.setItem('tasks', JSON.stringify(allTask));
  render();
}
