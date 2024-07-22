import React from 'react';
import cardStyles from './Card.css';

interface CardProps {
  title: string;
  description: string;
  members: { name: string; avatar: string }[];
  startDate: string;
  endDate: string;
}

const Card: React.FC<CardProps> = ({ title, description, members, startDate, endDate }) => {
  return (
    <div className={cardStyles.card}>
      <h2 className={cardStyles.title}>{title}</h2>
      <p className={cardStyles.description}>{description}</p>
      <div className={cardStyles.members}>
        {members.map((member, index) => (
          <div key={index} className={cardStyles.member}>
            <img src={member.avatar} alt={member.name} className={cardStyles.avatar} />
            <span className={cardStyles.initials}>{member.name}</span>
          </div>
        ))}
      </div>
      <p className={cardStyles.dates}>{startDate} ~ {endDate}</p>
    </div>
  );
};

export default Card;
