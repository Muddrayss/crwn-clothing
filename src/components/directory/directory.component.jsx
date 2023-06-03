import DirectoryItem from '../directory-item/directory-item.component';

import './directory.styles.scss';

const categories = [
  {
    id: 1,
    route: 'shop/hats',
    title: 'hats',
    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
  },
  {
    id: 2,
    route: 'shop/jackets',
    title: 'jackets',
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
  },
  {
    id: 3,
    route: 'shop/sneakers',
    title: 'sneakers',
    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
  },
  {
    id: 4,
    route: 'shop/womens',
    title: 'womens',
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
  },
  {
    id: 5,
    route: 'shop/mens',
    title: 'mens',
    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
  },
];

const Directory = () => {
  return (
    <div className='directory-container'>
      {categories.map((category) => {
        return <DirectoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};

export default Directory;
