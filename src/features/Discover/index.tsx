import React, { useEffect, useState, useRef, RefObject } from 'react';
import { api, sleep, debounce, elemInView } from 'utils';
import { Profile } from './types';
import Header from 'common/Header';
import Widget from 'common/Widget';
import Button from 'common/Button';
import SkeletonFrame from 'common/SkeletonFrame';
import PodSpotlight from 'common/PodSpotlight';
import './index.scss';

const Discover: React.FC<{
  readonly drawerContent: RefObject<HTMLElement>;
}> = ({ drawerContent }) => {
  const loadMore = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);
  const onScroll = useRef(
    debounce(() => {
      if (!isFetching.current && elemInView(loadMore))
        setPage((prevPage) => prevPage + 1);
    }, 10)
  );

  const [page, setPage] = useState(1);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    drawerContent?.current?.addEventListener('scroll', onScroll.current);
  }, [drawerContent]);

  // Infinite scroll
  useEffect(() => {
    (async () => {
      isFetching.current = true;
      const [error, response] = await api.get(`/discover/page/${page}.json`);
      if (!error) {
        // Simulate slow API response on the first call to show off skeleton frames
        if (page === 1) await sleep(1000);
        setProfiles((prevProfiles) => [...prevProfiles, ...response.discover]);
        isFetching.current = false;
      }
      if (page === 3)
        drawerContent?.current?.removeEventListener('scroll', onScroll.current);
    })();
  }, [page, drawerContent]);

  return (
    <main className="discover">
      <Header insideDrawer />
      <section className="view">
        <Widget className="friends" header="Friends" transparent>
          <p>Stories from your friends will appear here.</p>
          <Button label="Add Friends" purple />
        </Widget>
        <Widget header="For You" transparent>
          <div className="inner">
            {profiles.length ? (
              profiles.map(({ image, title }) => (
                <PodSpotlight
                  key={image}
                  image={image}
                  title={title}
                  testId="discover-item"
                />
              ))
            ) : (
              <SkeletonFrame count={10} />
            )}
          </div>
        </Widget>
        <div ref={loadMore} className="load-more"></div>
      </section>
    </main>
  );
};

export default Discover;
