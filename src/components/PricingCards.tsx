import React from 'react';
import styles from './PricingCards.module.css';

const PricingCards = () => {
  const tiers = [
    {
      title: 'Starter Pack',
      price: '$499',
      description: 'Perfect for small projects and MVPs.',
      features: ['1 Page Next.js Site', 'SEO Optimization', 'Basic Analytics', '1 Week Delivery'],
      theme: 'cyan'
    },
    {
      title: 'Explosive Growth',
      price: '$1299',
      description: 'Perfect for your next content, leave to us and enjoy the result!',
      features: ['Full Stack Web App', 'CMS Integration', 'Advanced SEO', 'Influencer Outreach', 'Priority Support'],
      theme: 'purple'
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      description: 'For large scale applications requiring high performance.',
      features: ['Custom Architecture', 'Load Balancing', 'Dedicated Server', '24/7 Support', 'SLA Guarantee'],
      theme: 'mixed'
    }
  ];

  return (
    <div className={styles.grid}>
      {tiers.map((tier, idx) => (
        <div key={idx} className={`${styles.card} ${styles[tier.theme]}`}>
          <div className={styles.card__border} />
          <div className={styles.card_title__container}>
            <span className={styles.card_title}>{tier.title}</span>
            <p className={styles.card_paragraph}>{tier.description}</p>
            <div className="text-white font-bold text-2xl mt-2">{tier.price}</div>
          </div>
          <hr className={styles.line} />
          <ul className={styles.card__list}>
            {tier.features.map((feature, fIdx) => (
              <li key={fIdx} className={styles.card__list_item}>
                <span className={styles.check}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={styles.check_svg}>
                    <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className={styles.list_text}>{feature}</span>
              </li>
            ))}
          </ul>
          <button className={styles.button}>Book a Call</button>
        </div>
      ))}
    </div>
  );
}

export default PricingCards;
