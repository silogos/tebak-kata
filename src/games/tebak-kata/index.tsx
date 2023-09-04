import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import config from './config';
import styles from './styles/TebakKata.module.scss';

const Home: NextPage = () => {
  return (
    <Layout title="PILIH JUMLAH KATA">
      <div className={styles.container}>
        <div className="menu">
          {config.menu.map((menuItem) => {
            return (
              <>
                <Link href={`tebak-kata/${menuItem.key}`} prefetch={false}>
                  <a className="menu-item" key={menuItem.key}>
                    {menuItem.title}
                  </a>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
