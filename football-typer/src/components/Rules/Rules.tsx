import React, { ReactElement, useState } from 'react'

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Pagination from 'react-bootstrap/Pagination';

const accordionTitles: string[] = ['Rule 1', 'Rule 2']
const accordionRules: string[] = ['That is description of rule 1', 'That is description of rule 2']

const faqContent: {title: string, body: string}[] = [
  {title: 'FAQ question 1', body: 'This is body of FAQ question 1'},
  {title: 'FAQ question 2', body: 'This is body of FAQ question 2'},
  {title: 'FAQ question 3', body: 'This is body of FAQ question 3'},]

const paginationTitles: RulesSectionType[] = ['Rules', 'Terms&Conditions', 'FAQ']
export type RulesSectionType = 'Rules' | 'FAQ' | 'Terms&Conditions';


const Rules = () => {
  let items: ReactElement<any, any>[] = []
  const [currentSection, setCurrentSection] = useState<RulesSectionType>('FAQ');
  for (let index = 0; index <= 2; index++) {
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
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Pagination>
          {items}
        </Pagination>
      </div>
      
      <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
        <div style={{width: '70%', }}>
        { 
          currentSection === 'Rules' && accordionTitles.map((title, index) => (
            <Accordion >
                <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>  <h5>{title}</h5> </Accordion.Header>
                <Accordion.Body> {accordionRules[index]} </Accordion.Body>
                </Accordion.Item>
            </Accordion>  
          )) 
        }
        {
          currentSection === 'FAQ' && 
          faqContent.map(({title, body}, index) => (
            <Accordion>
               <Accordion.Item eventKey={`faq-${index.toString()}`}>
                <Accordion.Header>  <h5>{title}</h5> </Accordion.Header>
                <Accordion.Body> {body} </Accordion.Body>
                </Accordion.Item>
            </Accordion>
          ))
        }
        {
          currentSection === 'Terms&Conditions' && 
          <>
          </>
        }
        </div>   
      </div>
    </div>
  )
}

export default Rules