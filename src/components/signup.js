import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions'

class Signup extends Component {

  // controlled form for username, password and language
  state = {
    username: "",
    password: "",
    language: "",
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // on submit, call createUser
  // clear form
  submitHandler = e => {
    e.preventDefault();
    this.props.createUser(this.state)
    this.setState({
      username: "",
      password: "",
      language: ""
    });
  };

  render() {
    // if there is no token, show signup form
    // language values correspond to google translate language codes
    let token = localStorage.getItem("token")
    if (!!token) {
      return null
    } else if (!token) {
      return (
        <div>
          <h1>Signup</h1>
          <form onSubmit={this.submitHandler} class="ui small form">
            <div class="equal width fields">
              <div class="field">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.changeHandler}
                  />
              </div>
              <div class="field">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.changeHandler}
                  />
              </div>
              <div class="field">
              <select onChange={this.changeHandler} name="language" style={{height:"36px", fontSize:"10px"}}>
                <option value="">Please Select Language</option>
                <option value="af">Afrikaans</option>
                <option value="sq">Albanian</option>
                <option value="am">Amharic</option>
                <option value="ar">Arabic</option>
                <option value="hy">Armenian</option>
                <option value="az">Azerbaijani</option>
                <option value="eu">Basque</option>
                <option value="be">Belarusian</option>
                <option value="bn">Bengali</option>
                <option value="bs">Bosnian</option>
                <option value="bg">Bulgarian</option>
                <option value="ca">Catalan</option>
                <option value="ceb">Cebuano</option>
                <option value="ny">Chichewa</option>
                <option value="zh">Chinese (Simplified)</option>
                <option value="zh-TW">Chinese (Traditional)</option>
                <option value="co">Corsican</option>
                <option value="hr">Croatian</option>
                <option value="cs">Czech</option>
                <option value="da">Danish</option>
                <option value="nl">Dutch</option>
                <option value="en">English</option>
                <option value="eo">Esperanto</option>
                <option value="et">Estonian</option>
                <option value="tl">Filipino</option>
                <option value="fi">Finnish</option>
                <option value="fr">French</option>
                <option value="fy">Frisian</option>
                <option value="gl">Galician</option>
                <option value="ka">Georgian</option>
                <option value="de">German</option>
                <option value="el">Greek</option>
                <option value="gu">Gujarati</option>
                <option value="ht">Haitian Creole</option>
                <option value="ha">Hausa</option>
                <option value="haw">Hawaiian</option>
                <option value="iw">Hebrew</option>
                <option value="hi">Hindi</option>
                <option value="hmn">Hmong</option>
                <option value="hu">Hungarian</option>
                <option value="is">Icelandic</option>
                <option value="ig">Igbo</option>
                <option value="id">Indonesian</option>
                <option value="ga">Irish</option>
                <option value="it">Italian</option>
                <option value="ja">Japanese</option>
                <option value="jw">Javanese</option>
                <option value="kn">Kannada</option>
                <option value="kk">Kazakh</option>
                <option value="km">Khmer</option>
                <option value="ko">Korean</option>
                <option value="ku">Kurdish (Kurmanji)</option>
                <option value="ky">Kyrgyz</option>
                <option value="lo">Lao</option>
                <option value="la">Latin</option>
                <option value="lv">Latvian</option>
                <option value="lt">Lithuanian</option>
                <option value="lb">Luxembourgish</option>
                <option value="mk">Macedonian</option>
                <option value="mg">Malagasy</option>
                <option value="ms">Malay</option>
                <option value="ml">Malayalam</option>
                <option value="mt">Maltese</option>
                <option value="mi">Maori</option>
                <option value="mr">Marathi</option>
                <option value="mn">Mongolian</option>
                <option value="my">Myanmar (Burmese)</option>
                <option value="ne">Nepali</option>
                <option value="no">Norwegian</option>
                <option value="ps">Pashto</option>
                <option value="fa">Persian</option>
                <option value="pl">Polish</option>
                <option value="pt">Portuguese</option>
                <option value="pa">Punjabi</option>
                <option value="ro">Romanian</option>
                <option value="ru">Russian</option>
                <option value="sm">Samoan</option>
                <option value="gd">Scots Gaelic</option>
                <option value="sr">Serbian</option>
                <option value="st">Sesotho</option>
                <option value="sn">Shona</option>
                <option value="sd">Sindhi</option>
                <option value="si">Sinhala</option>
                <option value="sk">Slovak</option>
                <option value="sl">Slovenian</option>
                <option value="so">Somali</option>
                <option value="es">Spanish</option>
                <option value="su">Sudanese</option>
                <option value="sw">Swahili</option>
                <option value="sv">Swedish</option>
                <option value="tg">Tajik</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
                <option value="th">Thai</option>
                <option value="tr">Turkish</option>
                <option value="uk">Ukranian</option>
                <option value="ur">Urdu</option>
                <option value="uz">Uzbek</option>
                <option value="vi">Vietnamese</option>
                <option value="cy">Welsh</option>
                <option value="xh">Xhosa</option>
                <option value="yi">Yiddish</option>
                <option value="yo">Yoruba</option>
                <option value="zu">Zulu</option>
              </select>

            </div>
            </div>
            <button class="ui button" onClick={
                this.submitHandler
              }>Submit</button>
            </form>
          </div>
        )
    }
  }
}

const mapStateToProps = ({user, token}) => {
  return {
    user,
    token
  }
}

export default connect(mapStateToProps, actions)(Signup)
