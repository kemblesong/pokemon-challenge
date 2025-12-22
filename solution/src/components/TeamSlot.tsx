import { useState, type DragEvent } from 'react';
import { getPokemonSprite } from '../services/api';
import type { Pokemon, TypeName } from '../types/pokemon';
import { TypeBadge } from './TypeBadge';

interface TeamSlotProps {
  pokemon: Pokemon | null;
  slotIndex: number;
  onRemove: () => void;
  isDragging?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDrop?: (fromIndex: number) => void;
  draggedIndex?: number | null;
}

export function TeamSlot({
  pokemon,
  slotIndex,
  onRemove,
  isDragging,
  onDragStart,
  onDragEnd,
  onDrop,
  draggedIndex,
}: TeamSlotProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', String(slotIndex));
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.();
  };

  const handleDragEnd = () => {
    onDragEnd?.();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedIndex !== null && draggedIndex !== slotIndex) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (!isNaN(fromIndex) && fromIndex !== slotIndex) {
      onDrop?.(fromIndex);
    }
  };

  const dragStyle = {
    opacity: isDragging ? 0.5 : 1,
    border: isDragOver ? '2px dashed #4dabf7' : '2px solid transparent',
    transition: 'opacity 0.2s, border-color 0.2s',
  };

  if (!pokemon) {
    return (
      <div
        className="team-slot empty"
        style={dragStyle}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <span className="slot-number">{slotIndex + 1}</span>
        <span className="slot-placeholder">Empty</span>
      </div>
    );
  }

  const sprite = getPokemonSprite(pokemon);

  return (
    <div
      className="team-slot filled"
      style={{ background: '#2a2a2a', cursor: 'grab', ...dragStyle }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <span className="slot-number">{slotIndex + 1}</span>
      <button
        type="button"
        onClick={onRemove}
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          background: '#ff4444',
          border: 'none',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '12px',
          lineHeight: '1',
          padding: 0,
        }}
        aria-label={`Remove ${pokemon.name}`}
      >
        ×
      </button>
      <img
        src={sprite}
        alt={pokemon.name}
        style={{ width: '60%', height: 'auto' }}
      />
      <div style={{ textTransform: 'capitalize', fontWeight: 600, fontSize: '0.875rem' }}>
        {pokemon.name}
      </div>
      <div>
        {pokemon.types.map((t) => (
          <TypeBadge key={t.type.name} type={t.type.name as TypeName} />
        ))}
      </div>
    </div>
  );
}
