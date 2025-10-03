import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { client, urlFor } from '../client';
import './ProjectDetail.scss';

const fetchProject = async (identifier) => {
  const query = `*[_type == "works" && (_id == $identifier || slug.current == $identifier)][0]`;
  return client.fetch(query, { identifier });
};

const normalizeToPlainText = (value) => {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (!item) {
          return '';
        }

        if (typeof item === 'string') {
          return item;
        }

        if (item?._type === 'block' && Array.isArray(item.children)) {
          return item.children.map((child) => child?.text || '').join('');
        }

        return '';
      })
      .filter(Boolean)
      .join('\n\n');
  }

  if (value?._type === 'block' && Array.isArray(value.children)) {
    return value.children.map((child) => child?.text || '').join('');
  }

  return '';
};

const buildParagraphsFromProject = (project) => {
  const fallbackFields = [
    project?.detailedDescription,
    project?.longDescription,
    project?.fullDescription,
    project?.descriptionLong,
    project?.description,
  ];

  const combinedText = fallbackFields.map(normalizeToPlainText).filter(Boolean).join('\n\n');

  if (!combinedText) {
    return [];
  }

  return combinedText
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);
    setError(null);
    setProject(null);

    fetchProject(projectId)
      .then((data) => {
        if (!isSubscribed) {
          return;
        }

        if (!data) {
          setError('not-found');
          return;
        }

        setProject(data);
      })
      .catch(() => {
        if (isSubscribed) {
          setError('generic');
        }
      })
      .finally(() => {
        if (isSubscribed) {
          setIsLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [projectId]);

  if (isLoading) {
    return (
      <>
        <main className='project-detail'>
          <div className='project-detail__wrapper'>
            <p className='p-text'>Loading project...</p>
          </div>
        </main>
        <footer className='project-detail__footer'>
          <p className='p-text'>@2025 ALINA KOVALEVA</p>
          <p className='p-text'>All rights reserved</p>
        </footer>
      </>
    );
  }

  if (error) {
    const message =
      error === 'not-found'
        ? 'The project was not found or is no longer available.'
        : 'We could not load the project. Please try again later.';

    return (
      <>
        <main className='project-detail'>
          <div className='project-detail__wrapper'>
            <p className='p-text'>{message}</p>
            <Link className='project-detail__back' to={{ pathname: '/', hash: '#work' }}>
              Back to portfolio
            </Link>
          </div>
        </main>
        <footer className='project-detail__footer'>
          <p className='p-text'>@2025 ALINA KOVALEVA</p>
          <p className='p-text'>All rights reserved</p>
        </footer>
      </>
    );
  }

  const paragraphs = buildParagraphsFromProject(project);
  const highlightList = Array.isArray(project?.highlights)
    ? project.highlights.filter((item) => typeof item === 'string' && item.trim().length > 0)
    : [];

  return (
    <>
      <main className='project-detail'>
        <div className='project-detail__wrapper'>
          <div className='project-detail__image'>
            {project?.imgUrl && <img src={urlFor(project.imgUrl)} alt={project?.title || 'Project preview'} />}
          </div>

          <div className='project-detail__content'>
            <h1 className='project-detail__title'>{project?.title}</h1>

            <div className='project-detail__description'>
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => (
                  <p key={`${projectId}-paragraph-${index}`} className='p-text'>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className='p-text'>Project description will be available soon.</p>
              )}
            </div>

            {highlightList.length > 0 && (
              <div className='project-detail__highlights'>
                <h2>Highlights</h2>
                <ul>
                  {highlightList.map((highlight, index) => (
                    <li key={`${projectId}-highlight-${index}`} className='p-text'>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className='project-detail__links'>
              {project?.projectLink && (
                <a href={project.projectLink} target='_blank' rel='noreferrer' className='project-detail__link'>
                  View project
                </a>
              )}
              {project?.codeLink && (
                <a href={project.codeLink} target='_blank' rel='noreferrer' className='project-detail__link'>
                  View code
                </a>
              )}
            </div>

            <Link className='project-detail__back' to={{ pathname: '/', hash: '#work' }}>
              Back to portfolio
            </Link>
          </div>
        </div>
      </main>
      <footer className='project-detail__footer'>
        <p className='p-text'>@2025 ALINA KOVALEVA</p>
        <p className='p-text'>All rights reserved</p>
      </footer>
    </>
  );
};

export default ProjectDetail;
