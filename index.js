const _ = require('lodash')

module.exports = function(bp) {

  bp.middlewares.load()

  const utterances = {
    one: /one|1/i,
    two: /two|2/i,
    three: /three|3/i,
    four: /four|4/i,
    five: /five|5/i,
    stop: /stop|cancel|abort/i,
    eight: /eight|8/i,
    yes: /yes/i,
    no: /no/i,
    zero: /zero|0/i
  }

  bp.hear(utterances.stop, (event, next) => {
    const convo = bp.convo.find(event)
    convo && convo.stop('aborted')
  })

  bp.hear(/hello/i, (event, next) => {
    
    const txt = txt => bp.messenger.createText(event.user.id, txt)

    bp.convo.start(event, convo => {
      convo.threads['default'].addMessage(txt('Hello! This is channel your doctor app'))
      convo.threads['default'].addMessage(txt('How i can help you'))
      convo.threads['default'].addMessage(txt('-------------------------------------'))
      convo.threads['default'].addMessage(txt('1 : Find your details'))
      convo.threads['default'].addMessage(txt('2 : Find details about doctors'))
      convo.threads['default'].addMessage(txt('3 : Find doctors name who work in hear'))
      convo.threads['default'].addMessage(txt('4 : Find doctors scheduled for channeling'))
      convo.threads['default'].addMessage(txt('5 : Channel a doctor'))
      convo.threads['default'].addMessage(txt('-------------------------------------'))
      convo.threads['default'].addQuestion(txt('Enter number!! '), [
        {
          pattern: utterances.one,
          callback: (response) => { // Using the response event
            convo.switchTo('one')
          }
        },
        {
          pattern: utterances.two,
          callback: (response) => { // Using the response event
            convo.switchTo('two')
          }
        },
        {
          pattern: utterances.three,
          callback: (response) => { // Using the response event
            convo.switchTo('three')
          }
        },
        {
          pattern: utterances.four,
          callback: (response) => { // Using the response event
            convo.switchTo('four')
          }
        }, 
        {
          pattern: utterances.five,
          callback: (response) => { // Using the response event
            convo.switchTo('five')
          }
        },                       
        {
          default: true,
          callback: () => {
            convo.say(txt('Hrm.. Im expecting a number!'))
            convo.repeat()
          }
        }
      ])

      convo.createThread('one')
      convo.threads['one'].addQuestion(txt('Enter your user ID'), [
        {
          pattern: /(\d+)/i,
          callback: (response) => { // Using the response event
            convo.set('age', response.match) // Captured group is stored in event
            convo.say(txt('Please wait until load all details'))

                var mysql = require("mysql");

                //how made connection
                var connection = mysql.createConnection({
                  host:'localhost',
                  user:'root',
                  password:'root',
                  database:'dental_db',
                  port:3306
                });

                //select query
                connection.query("select * from tbl_patient where SERIAL_NUMBER = " +  "\"" + response.match + "\"" ,
                  function(err,rows){
                    if(err){
                      console.log(err);
                      return;
                    }
                    rows.forEach(function(result){
                      console.log(result.ID);
                      convo.say(txt(`ID:` + result.ID ))
                      convo.say(txt(`SERIAL_NUMBER:` + result.SERIAL_NUMBER ))
                      convo.say(txt(`TITLE:` + result.TITLE ))
                      convo.say(txt(`SURNAME:` + result.SURNAME ))
                      convo.say(txt(`INITIALS:` + result.INITIALS ))
                      convo.say(txt(`FIRST_NAME:` + result.FIRST_NAME ))
                      convo.say(txt(`NIC:` + result.NIC ))
                      convo.say(txt(`CHILD:` + result.CHILD ))
                      convo.say(txt(`DATE_OF_BIRTH:` + result.DATE_OF_BIRTH ))
                      convo.say(txt(`SEX:` + result.SEX ))
                      convo.say(txt(`ETHNICITY:` + result.ETHNICITY ))
                      convo.say(txt(`COUNTRY:` + result.COUNTRY ))
                      convo.say(txt(`MOBILE:` + result.MOBILE ))
                      convo.say(txt(`EMAIL:` + result.EMAIL ))
                      convo.say(txt(`ADDRESS:` + result.ADDRESS ))
                      convo.say(txt(` MARITAL_STATUS:` + result.MARITAL_STATUS ))
                    })
                  });

                //connection end
                connection.end(function(){
                  convo.switchTo('level')
                });

          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Your entered user Id is not registered!!!! or wrong user id entered!!'))
            convo.repeat()
          }
        }
      ])

//----------------------------------------------

      convo.createThread('two')
      convo.threads['two'].addQuestion(txt('Enter doctor first name'), [
        {
          pattern: /(\w+)/i,
          callback: (response) => { // Using the response event
            convo.set('name', response.match) // Captured group is stored in event
            convo.say(txt('Please wait until load all details'))
                var mysql = require("mysql");

                //how made connection
                var connection = mysql.createConnection({
                  host:'localhost',
                  user:'root',
                  password:'root',
                  database:'dental_db',
                  port:3306
                });

                //select query
                connection.query("select * from tbl_doctor where FIRST_NAME = " +  "\"" + response.match + "\"" ,
                  function(err,rows){
                    if(err){
                      console.log(err);
                      return;
                    }
                    rows.forEach(function(result){
                      console.log(result.ID);
                      convo.say(txt(`ID:` + result.ID ))
                      convo.say(txt(`SERIAL_NUMBER:` + result.SERIAL_NUMBER )) 
                      convo.say(txt(`SURNAME:` + result.SURNAME ))
                      convo.say(txt(`INITIALS:` + result.INITIALS ))
                      convo.say(txt(`FIRST_NAME:` + result.FIRST_NAME ))
                      convo.say(txt(`NIC:` + result.NIC ))
                      convo.say(txt(`SEX:` + result.SEX ))
                      convo.say(txt(`ETHNICITY:` + result.ETHNICITY ))
                      convo.say(txt(`COUNTRY:` + result.COUNTRY ))
                      convo.say(txt(`MOBILE:` + result.MOBILE ))
                      convo.say(txt(`EMAIL:` + result.EMAIL ))
                      convo.say(txt(`ADDRESS:` + result.ADDRESS ))
                      convo.say(txt(`MP:` + result.MP ))
                      convo.say(txt(`PR:` + result.PR ))
                      convo.say(txt(`Name of degree:` + result.name_degree ))
                      convo.say(txt(`Institution:` + result.Institution ))
                    })
                  });

                //connection end
                connection.end(function(){
                  convo.switchTo('level')
                });

          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Your entered doctor is not working hear!!!!'))
            convo.repeat()
          }
        }
      ])

//----------------------------------------------
      convo.createThread('three')
      convo.threads['three'].addMessage(txt('Please wait until load all details'))

                var mysql = require("mysql");

                //how made connection
                var connection = mysql.createConnection({
                  host:'localhost',
                  user:'root',
                  password:'root',
                  database:'dental_db',
                  port:3306
                });

                //select query
                connection.query("select * from tbl_doctor" ,
                  function(err,rows){
                    if(err){
                      console.log(err);
                      return;
                    }
                    rows.forEach(function(result){
                      convo.threads['three'].addMessage(txt('Dr.' + result.FIRST_NAME + ' ' + result.SURNAME))
                    })
                    
                  });  

//-----------------------------------------------

      convo.createThread('four')
      convo.threads['four'].addQuestion(txt('Enter doctor first name'), [
        {
          pattern: /(\w+)/i,
          callback: (response) => { // Using the response event
            convo.set('name', response.match) // Captured group is stored in event
            convo.say(txt('Please wait until load all details'))
                var mysql = require("mysql");

                //how made connection
                var connection = mysql.createConnection({
                  host:'localhost',
                  user:'root',
                  password:'root',
                  database:'dental_db',
                  port:3306
                });

                //select query
                connection.query("select * from tbl_doctor where FIRST_NAME = " +  "\"" + response.match + "\"" ,
                  function(err,rows){
                    if(err){
                      console.log(err);
                      return;
                    }
                    rows.forEach(function(result){
                      convo.say(txt(`You can doctor channel at:` + result.WORK_TIME ))
                      convo.say(txt(`MOBILE:` + result.MOBILE ))
                    })
                  });

                //connection end
                connection.end(function(){
                  convo.switchTo('level')
                });

          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Your entered doctor is not working hear!!!!'))
            convo.repeat()
          }
        }
      ])

//-----------------------------------------------


      convo.createThread('level')
      convo.threads['level'].addMessage(txt('*************************'))
      convo.threads['level'].addMessage(txt('Enter 8 for back to menu'))
      convo.threads['level'].addMessage(txt('Enter -stop- for end'))
      convo.threads['level'].addMessage(txt('*************************'))
      convo.threads['level'].addQuestion(txt('Enter your choise now!! '), [
        {
          pattern: utterances.eight,
          callback: (response) => { // Using the response event
            convo.switchTo('default')
          }
        },
        {
          pattern: utterances.zero,
          callback: (response) => { // Using the response event
            convo.switchTo('aborted')
          }
        },                        
        {
          default: true,
          callback: () => {
            convo.say(txt('Hrm.. Im expecting 8 or -stop-!'))
            convo.repeat()
          }
        }
      ])

//-----------------------------------------------


      convo.createThread('five')
      convo.threads['five'].addQuestion(txt('Enter doctor first name you want channel'), [
        {
          pattern: /(\w+)/i,
          callback: (response) => { // Using the response event
            convo.set('name', response.match) // Captured group is stored in event

                var mysql = require("mysql");

                //how made connection
                var connection = mysql.createConnection({
                  host:'localhost',
                  user:'root',
                  password:'root',
                  database:'dental_db',
                  port:3306
                });

                //select query
                connection.query("select * from tbl_doctor where FIRST_NAME = " +  "\"" + response.match + "\"" ,
                  function(err,rows){
                    if(err){
                      console.log(err);
                      return;
                    }
                    rows.forEach(function(result){
                      convo.say(txt('You can doctor ' +  result.FIRST_NAME + ' ' + result.SURNAME  + ' channel at:' + result.WORK_TIME ))
                      convo.say(txt(`Book fees : ` + result.BOOK_FEES ))
                    })
                  });

                //connection end
                connection.end(function(){
                  convo.switchTo('doctorChannel')
                });

          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Your entered doctor is not working hear!!!!'))
            convo.repeat()
          }
        }
      ])

//-----------------------------------------------

      convo.createThread('doctorChannel')
      convo.threads['doctorChannel'].addMessage(txt('*************************'))
      convo.threads['doctorChannel'].addQuestion(txt('Do you want to channel this doctor'), [
        {
          pattern: utterances.yes,
          callback: (response) => { // Using the response event
            convo.switchTo('doctorChannelNext')
          }
        },
        {
          pattern: utterances.no,
          callback: (response) => { // Using the response event
            convo.switchTo('level')
          }
        },                        
        {
          default: true,
          callback: () => {
            convo.say(txt('Hrm.. Im expecting a number!'))
            convo.repeat()
          }
        }
      ])

//-----------------------------------------------
var bookNumber = 1250;

      convo.createThread('doctorChannelNext')
      convo.threads['doctorChannelNext'].addQuestion(txt('Enter your name'), [
        {
          pattern: /(\w+)/i,
          callback: (response) => { // Using the response event
            convo.set('name', response.match) // Captured group is stored in event
                var mysql = require("mysql");

                //how made connection
                var connection = mysql.createConnection({
                  host:'localhost',
                  user:'root',
                  password:'root',
                  database:'dental_db',
                  port:3306
                });

                //select query
                connection.query("insert into tbl_book values (\'" + bookNumber + "',\'" + response.match + "\',\'953060108V\',\'0712231234\',\'92 kandy road wattegama\',\'92108\')" ,
                  function(err,rows){
                    if(err){
                      console.log(err);
                      return;
                    }
                    })

                //connection end
                connection.end(function(){
                  convo.say(txt(response.match + ' your\'s book number is ' + bookNumber + '!!' ))
                  convo.say(txt('Thanks for join with channel your doctor'))
                  bookNumber++;
                  convo.switchTo('level')
                });

          }
        },
        {
          default: true,
          callback: () => {
            convo.say(txt('Your entered doctor is not working hear!!!!'))
            convo.repeat()
          }
        }
      ]) 

//-----------------------------------------------
      convo.on('done', () => {
        convo.switchTo('level')
      })

      convo.on('aborted', () => {
        convo.say(txt('You aborted this conversation. Bye!'))
      })

    })

  })
}