import React, { ReactElement, useState } from 'react'

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Pagination from 'react-bootstrap/Pagination';

const accordionTitles: string[] = ['How to win points', 'Factor', 'Bet Time', 'App using rules'];
const accordionRules: string|any[] = [
  'You can win points by betting correct score of the game. You receive 2 points for correct match result or 4 points if you bet exact score. In knockout phase matches only main 90 minutes of match are considered.',
  <div>
    To make our game even more interesting we introduce factors in knockout stage. <br></br>
    <strong>Stage</strong> - Correct result / Correct Score <br></br>
    <strong>1/8</strong> - 3 points / 6 points <br></br>
    <strong>Quaterfinals</strong> - 4 points / 8 points <br></br>
    <strong>Semifinals & 3rd place </strong> - 5 points / 10 points <br></br> 
    <strong>Final</strong> - 6 points / 12 points.
  </div>,
  'You may create/update your only before start of the match. We strongly recommend to make it at least 1 minute before start.',
  <div>
    For violation on every of rule user can be banned and kicked out of the competiton: <br></br> 
    <strong>1.</strong> Uploading image that contains nudity, violance or any other offensive content. <br></br>
    <strong>2.</strong> Any kind of cheating is forbidden. <br></br>
    <strong>3.</strong> User can't check bets of other players before start of the match.
  </div>
]

const faqContent: { title: string, body: string }[] = [
  { title: 'Can I see bets of other players?', body: `No it's not possible. We disabled this feature to avoid situation where you copy bet of your opponent.` },
  { title: 'I forgot to bet on time. What can I do?', body: 'Unluckily in this kind of situation you just lost opportunity to win points. ' },
  { title: `I bet a game but system show wrong bet/I bet a correct score but don't receive points.`, body: `We don't covering situation quite like this, but if it would happen, please inform admin. There's a record of all actions made by users in our database and after verification we may fix issue.` },
  { title: `I've seen a bug`, body: `If you have seen a bug, please contact admin. Your message should contain screenshot and description of problem.` }, 
  {  title: 'Do I have to bet all matches at once?', body: 'You are able to bet every single match until it starts.'}
]
const paginationTitles: RulesSectionType[] = ['Rules', 'FAQ']
export type RulesSectionType = 'Rules' | 'FAQ'


const Rules = () => {
  let items: ReactElement<any, any>[] = []
  const [currentSection, setCurrentSection] = useState<RulesSectionType>('FAQ');
  for (let index = 0; index <= 1; index++) {
    items.push(
      <Pagination.Item
        key={index}
        active={paginationTitles[index] === currentSection}
        onClick={() => {
          setCurrentSection(paginationTitles[index])
        }}>
        {paginationTitles[index]}
      </Pagination.Item>,
    );
  }

  return (

    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2vh' }}>
        <Pagination>
          {items}
        </Pagination>
      </div>

      <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <div style={{ width: '70%' }}>
          {
            currentSection === 'Rules' && accordionTitles.map((title, index) => (
              <Accordion key={index}>
                <Accordion.Item eventKey={index.toString()}>
                  <Accordion.Header>  <h5>{title}</h5> </Accordion.Header>
                  <Accordion.Body> {accordionRules[index]} </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))
          }
          {
            currentSection === 'FAQ' &&
            faqContent.map(({ title, body }, index) => (
              <Accordion key={index}>
                <Accordion.Item eventKey={`faq-${index.toString()}`}>
                  <Accordion.Header>  <h5>{title}</h5> </Accordion.Header>
                  <Accordion.Body> {body} </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Rules