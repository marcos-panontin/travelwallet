import React, { Component } from 'react';
import click from '../sounds/click.mp3'
import click2 from '../sounds/click2.mp3'
import click3 from '../sounds/click3.mp3'

class DarkmodeToggle extends Component {

  state = {
    darkmode: false,
  }

  componentDidMount() {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
        this.setState({
          darkmode: true,
        })
  } else {
    document.documentElement.classList.remove('dark');
                this.setState({
          darkmode: false,
        })

  }
  }

  handleCheckboxChange = ({ target: { checked } }) => {
    if (checked) {
      const audio = new Audio(click2);
      audio.play()
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark'
    } else {
      const audio = new Audio(click3);
      audio.play()
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light'
    }
    this.setState((prevState) => ({
      darkmode: !prevState.darkmode,
    }));
  };

  render() {
    const { darkmode } = this.state;
    return (
      <div>
        <label className="flex cursor-pointer">
          <input
            type="checkbox"
            id="dark-mode-checkbox"
            className="sr-only peer"
            checked={darkmode}
            onChange={this.handleCheckboxChange}
          />
          <div
            className={`peer ${
              darkmode ? 'bg-moon after:animate-moonAnimation' : 'bg-sun after:animate-sunAnimation'
            } after:bg-[length:14px_14px] after:bg-no-repeat after:bg-center after:transition-all after:duration-300 after:left-0 peer-checked:after:left-6 w-14 h-8 bg-zinc-300 dark:bg-zinc-500 rounded-full px-1 flex items-center after:rounded-full after:content-[''] after:flex after:relative after:w-6 after:h-6 after:bg-zinc-100 dark:after:bg-zinc-800 shadow-inner after:shadow-custom peer-checked:after:shadow-customwhite after:rotate-180 peer-checked:after:rotate-0`}
          />
        </label>
      </div>
    );
    
  }
}

export default DarkmodeToggle;
