import { component$, useSignal, useStore, $, type PropFunction } from '@builder.io/qwik';
import { Card, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { FilterOptions, User } from '../../types';
import { Checkbox } from '../ui/Checkbox';
import { SearchIcon, FilterIcon, XIcon, ChevronDownIcon, ChevronUpIcon } from '../Icons';

export interface TodoFilterProps {
  filterOptions: FilterOptions;
  onFilterChange$: PropFunction<(newFilters: FilterOptions) => void>;
  users: User[];
}

export const TodoFilter = component$<TodoFilterProps>((props) => {
  const { filterOptions, onFilterChange$, users } = props;

  // Local state
  const expanded = useSignal(false);
  const tempFilters = useStore<FilterOptions>({
    status: filterOptions.status,
    priority: filterOptions.priority,
    assignee: filterOptions.assignee,
    search: filterOptions.search,
  });

  // Count active filters
  const activeFiltersCount =
    (filterOptions.status !== 'all' ? 1 : 0) +
    (filterOptions.priority !== 'all' ? 1 : 0) +
    (filterOptions.assignee !== 'all' ? 1 : 0) +
    (filterOptions.search ? 1 : 0);

  // Handlers
  const handleSearchChange = $((value: string) => {
    tempFilters.search = value;
    onFilterChange$({
      ...filterOptions,
      search: value,
    });
  });

  const handleStatusChange = $((value: 'all' | 'active' | 'completed') => {
    tempFilters.status = value;
    onFilterChange$({
      ...filterOptions,
      status: value,
    });
  });

  const handlePriorityChange = $((value: 'all' | 'low' | 'medium' | 'high') => {
    tempFilters.priority = value;
    onFilterChange$({
      ...filterOptions,
      priority: value,
    });
  });

  const handleAssigneeChange = $((value: string) => {
    tempFilters.assignee = value;
    onFilterChange$({
      ...filterOptions,
      assignee: value,
    });
  });

  const handleExpandClick = $(() => {
    expanded.value = !expanded.value;
  });

  const handleClearFilters = $(() => {
    const resetFilters: FilterOptions = {
      status: 'all',
      priority: 'all',
      assignee: 'all',
      search: '',
    };

    tempFilters.status = 'all';
    tempFilters.priority = 'all';
    tempFilters.assignee = 'all';
    tempFilters.search = '';

    onFilterChange$(resetFilters);
  });

  return (
    <Card variant="default">
      <div style={{ marginBottom: '24px' }}>
        <CardContent>
          <div style={{ padding: '16px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: expanded.value ? '1fr' : '2fr 1fr',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              <div style={{ position: 'relative' }}>
                <Input
                  placeholder="Search todos..."
                  value={tempFilters.search}
                  onChange$={(e: any) => handleSearchChange(e.target.value)}
                  startIcon={<SearchIcon />}
                  endIcon={
                    tempFilters.search ? (
                      <div style={{ cursor: 'pointer' }} onClick$={() => handleSearchChange('')}>
                        <XIcon />
                      </div>
                    ) : undefined
                  }
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: expanded.value ? 'flex-start' : 'flex-end',
                }}
              >
                <Button
                  intent={expanded.value ? 'primary' : 'outline'}
                  onClick$={handleExpandClick}
                  style={{ marginRight: '8px' }}
                >
                  <FilterIcon />
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                  {expanded.value ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Button>

                {activeFiltersCount > 0 && (
                  <Button intent="outline" onClick$={handleClearFilters}>
                    <XIcon />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {expanded.value && (
              <div
                style={{
                  marginTop: '16px',
                  borderTop: '1px solid var(--border)',
                  paddingTop: '16px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                }}
              >
                <div>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    Status
                  </label>
                  <select
                    value={tempFilters.status}
                    onChange$={(e: any) => handleStatusChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--background)',
                      color: 'var(--foreground)',
                    }}
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    Priority
                  </label>
                  <select
                    value={tempFilters.priority}
                    onChange$={(e: any) => handlePriorityChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--background)',
                      color: 'var(--foreground)',
                    }}
                  >
                    <option value="all">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    Assignee
                  </label>
                  <select
                    value={tempFilters.assignee}
                    onChange$={(e: any) => handleAssigneeChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--background)',
                      color: 'var(--foreground)',
                    }}
                  >
                    <option value="all">All</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {activeFiltersCount > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '16px',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>Active filters:</span>

                {filterOptions.status !== 'all' && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 8px',
                      backgroundColor: 'var(--primary-background)',
                      color: 'var(--primary-foreground)',
                      borderRadius: '9999px',
                      fontSize: '12px',
                    }}
                  >
                    Status: {filterOptions.status}
                    <div style={{ marginLeft: '4px', cursor: 'pointer' }} onClick$={() => handleStatusChange('all')}>
                      <XIcon />
                    </div>
                  </div>
                )}

                {filterOptions.priority !== 'all' && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 8px',
                      backgroundColor: 'var(--secondary-background)',
                      color: 'var(--secondary-foreground)',
                      borderRadius: '9999px',
                      fontSize: '12px',
                    }}
                  >
                    Priority: {filterOptions.priority}
                    <div style={{ marginLeft: '4px', cursor: 'pointer' }} onClick$={() => handlePriorityChange('all')}>
                      <XIcon />
                    </div>
                  </div>
                )}

                {filterOptions.assignee !== 'all' && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 8px',
                      backgroundColor: 'var(--accent-background)',
                      color: 'var(--accent-foreground)',
                      borderRadius: '9999px',
                      fontSize: '12px',
                    }}
                  >
                    Assignee: {users.find((u) => u.id === filterOptions.assignee)?.name || filterOptions.assignee}
                    <div style={{ marginLeft: '4px', cursor: 'pointer' }} onClick$={() => handleAssigneeChange('all')}>
                      <XIcon />
                    </div>
                  </div>
                )}

                {filterOptions.search && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 8px',
                      backgroundColor: 'var(--muted-background)',
                      color: 'var(--muted-foreground)',
                      borderRadius: '9999px',
                      fontSize: '12px',
                    }}
                  >
                    Search: {filterOptions.search}
                    <div style={{ marginLeft: '4px', cursor: 'pointer' }} onClick$={() => handleSearchChange('')}>
                      <XIcon />
                    </div>
                  </div>
                )}

                {activeFiltersCount > 1 && (
                  <Button intent="outline" size="sm" onClick$={handleClearFilters}>
                    Clear all
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
});
