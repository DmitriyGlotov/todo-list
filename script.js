let allTask = JSON.parse(localStorage.getItem('tasks')) || [];
let valueInput = '';
let input = null;
let flagDell = true;

window.onload =  init = () =>  {
  input = document.getElementById('add-task');
  input.addEventListener('change', updateValue);
  render();
}

const onClickButton = () => {
  valueInput = valueInput.trim();
  if (valueInput) {
    allTask.push({
      text: valueInput,
      isCheck: false,
      checkButtPen: false,
    });
    localStorage.setItem('tasks', JSON.stringify(allTask));
    valueInput = '';
    input.value = '';
    render();
  } else {
    valueInput = '';
    input.value = '';
    alert ('ERROR');
  }
}

document.getElementById('add-task').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    valueInput = e.target.value.trim();
    if (valueInput) {
      allTask.push({
        text: valueInput,
        isCheck: false,
        checkButtPen: false,
      });
      localStorage.setItem('tasks', JSON.stringify(allTask));
      valueInput = '';
      input.value = '';
      render();
    } else {
      valueInput = '';
      input.value = '';
      alert ('ERROR');
    }
  }
});

const updateValue = (event) => {
  valueInput = event.target.value;
}

const render = () => {
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

    if (!allTask[index].checkButtPen) {
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

const createButtonDelAll = (containButMain) => {
  const butDelAll = document.createElement('input');
  butDelAll.type = 'image';
  butDelAll.className = 'but';
  butDelAll.src = 'delall.png';
  flagDell = false;

  butDelAll.onclick = () => {
    allTask = [];
    localStorage.clear();

    render();
  }

  containButMain.appendChild(butDelAll);
}

const createCheckbox = (container, index) => {
  const checkBox = document.createElement('input');
  checkBox.type = 'image';
  checkBox.className = 'but';
  allTask[index].isCheck ? checkBox.src = "checkBoxDone.png" : checkBox.src = "checkBox.png";

  checkBox.onclick = () => {
    allTask[index].isCheck = !allTask[index].isCheck;
    localStorage.setItem('tasks', JSON.stringify(allTask));

    render();
  }

  container.appendChild(checkBox);
}

const createButtonPen = (containBut, index) => {
  if (!allTask[index].isCheck) {
    const buttonPen = document.createElement('input');
    buttonPen.type = 'image';
    buttonPen.src = 'pencil.png';
    buttonPen.className = 'but';

    buttonPen.onclick = () => {
      onClickButtonPen(index);
    }

    containBut.appendChild(buttonPen);
  }
}

const createButtonDel = (containBut, index) => {
  const buttonDel = document.createElement('input');
  buttonDel.type = 'image';
  buttonDel.src = 'Del.png';
  buttonDel.className = 'but';

  buttonDel.onclick = () => {
    onClickButtonDel(index);
  };

  containBut.appendChild(buttonDel);
}

const createButtonCancel = (containBut, index) => {
  const butCanc = document.createElement('input');
  butCanc.className = 'but';
  butCanc.type = 'image';
  butCanc.src = 'cancel.png';

  butCanc.onclick = () => {
    allTask[index].checkButtPen = false;
    localStorage.setItem('tasks', JSON.stringify(allTask));

    render();
  }

  containBut.appendChild(butCanc);
}

const createButtonDone = (containBut, input, index) => {
  const butDone = document.createElement('input');
  butDone.className = 'but';
  butDone.type = 'image';
  butDone.src = "check.png";

  butDone.onclick = () => {
    allTask[index].checkButtPen = false;
    input.value = input.value.trim();

    if (input.value) allTask[index].text = input.value;
    localStorage.setItem('tasks', JSON.stringify(allTask));

    render();
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      allTask[index].checkButtPen = false;
      input.value = input.value.trim();

      if (input.value) allTask[index].text = input.value;
      localStorage.setItem('tasks', JSON.stringify(allTask));

      render();
    }
  });

  containBut.appendChild(butDone);
}

const onChangeCheckBox = index => {
  allTask[index].isCheck = !allTask[index].isCheck;
  localStorage.setItem('tasks', JSON.stringify(allTask));

  render();
}

const onClickButtonDel = (index) => {
  allTask.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(allTask));

  render();
}

const onClickButtonPen = (index) => {
  allTask[index].checkButtPen= true;

  localStorage.setItem('tasks', JSON.stringify(allTask));

  render();
}
